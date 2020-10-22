module.exports = (db) => {
  // get all active orders - Ayushi + Josh
  const getActiveOrders = () => {
    const query_string = `
      SELECT id, status, created_at
      FROM orders
      WHERE status <> 'Completed'
    `;

    return db.query(query_string)
    .then((res) => {
      return res.rows;
    });
  };

  // get all past orders - Ayushi + Josh
  const getInactiveOrders = () => {
    const query_string = `
      SELECT id, status, created_at
      FROM orders
      WHERE status = 'Completed'
    `;

    return db.query(query_string)
    .then(res => {
      return res.rows;
    });

  };

  // update order with ready time and status Accepted - Ayushi
  const updateOrderStatusToAccepted = (order_id, ready_time) => {
    const values = [order_id, ready_time];

    const query_string = `
      UPDATE orders
      SET status = 'Accepted', ready_at = $2
      WHERE id = $1
    `;

    return db.query(query_string, values)
    .then (res => {
      return res.rows;
    });

  };

  // update order status to 'Completed' - Ayushi
  const updatePastReadyOrdersToComplete = () => {
    const query_string = `
      UPDATE orders
      SET status = 'Completed'
      WHERE ready_at < now()
    `;

    return db.query(query_string)
      .then (res => {
        return res.rows;
      })
      .catch(err => {
        console.log(err);
      })
  };

  // get order details - Ayushi + Josh
  const getOrderDetails = (order_id) => {
    const values = [order_id];

    const query_string = `
      SELECT url_photo, item_name , description, price_cents, menu_orders.order_id, menu_orders.quantity, orders.created_at
      FROM menu
      JOIN menu_orders ON menu.id = menu_orders.menu_id
      JOIN orders ON orders.id = menu_orders.order_id
      WHERE orders.id = $1
    `;

    return db.query(query_string, values)
    .then (res => {
      return res.rows;
    });

  };

  // get menu - Josh
  const getMenu = () => {
    return db.query(`
      SELECT *
      FROM menu;
    `)
    .then(res => res.rows)
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  };

  // add an order - Josh
  const addOrder = (order) => {
    const client_id = order.clientId;
    const menu_items = order.menuItems;

    const ordersTblQuery = `
      INSERT INTO orders (client_id, status, created_at)
      VALUES (${client_id}, 'Pending', NOW())
      RETURNING id;
    `;

    return db.query(ordersTblQuery)
    .then(res => {
      const order_id = res.rows[0].id;
      return order_id;
    })
    .then(order_id => {
      const insertPromises = [];

      for (const menu_item_id in menu_items) {
        const quantity = menu_items[menu_item_id];

        const insertPromise = db.query(`
          INSERT INTO menu_orders (order_id, menu_id, quantity)
          VALUES (${order_id}, ${menu_item_id}, ${quantity});
        `);

        insertPromises.push(insertPromise);
      }

      return Promise.all(insertPromises);
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  }

  return {
    getActiveOrders,
    getInactiveOrders,
    updateOrderStatusToAccepted,
    updatePastReadyOrdersToComplete,
    getOrderDetails,
    getMenu,
    addOrder
  }
}
