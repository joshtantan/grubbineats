module.exports = db => {
  // @TODELETE after testing
  const getOrders = () => {
    return db.query(`
      SELECT *
      FROM orders;
    `)
    .then(res => res.rows)
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  };

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

  const getOrderDetails = (orderId) => {
    return db.query(`
      SELECT orders.id, url_photo, item_name, description, quantity, price_cents
      FROM orders
      JOIN menu_orders ON orders.id = menu_orders.order_id
      JOIN menu ON menu.id = menu_orders.menu_id
      WHERE orders.id = ${orderId};
    `)
    .then(res => res.rows)
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  };

  const getActiveOrders = () => {
    return db.query(`
      SELECT *
      FROM orders
      WHERE status <> 'completed';
    `)
    .then(res => res.rows)
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  };

  const getInactiveOrders = () => {
    return db.query(`
      SELECT *
      FROM orders
      WHERE status = 'completed';
    `)
    .then(res => res.rows)
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  };

  const updateOrder = (orderId, status) => {
    let queryString = 'UPDATE orders ';

    switch (status) {
      case 'accepted':
        queryString += "SET status = 'accepted', accepted_at = NOW()"
        break;
      case 'ready':
        queryString += "SET status = 'ready', ready_at = NOW()"
        break;
      case 'completed':
        queryString += "SET status = 'completed', completed_at = NOW()"
        break;
    }

    queryString += `
      WHERE id = ${orderId};
    `;

    return db.query(queryString)
    .then(res => {
      return res.rows;
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  };

  const addOrder = (order) => {
    const client_id = order.clientId;
    const menu_items = order.menuItems;
    const number_of_items = Object.keys(menu_items).length;

    const ordersTblQuery = `
      INSERT INTO orders (client_id, status, created_at)
      VALUES(${client_id}, 'created', NOW())
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
          VALUES(${order_id}, ${menu_item_id}, ${quantity});
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
    getOrders,
    getMenu,
    getOrderDetails,
    getActiveOrders,
    getInactiveOrders,
    updateOrder,
    addOrder
  }
}
