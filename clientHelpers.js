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
    // add ifs to check status and determine which time to update in query
    // i.e.
    // status = accepted ? accepted_at = NOW()
    // status = ready ? ready_at = NOW()

    return db.query(`
      UPDATE orders
      SET status = ${status}, ready_at = NOW()
      WHERE id = ${orderId};
    `)
    .then(res => {
      return res.rows;
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  };

  // @TODO
  // const addOrder = () => {
  //   // must use several statements in order of FK dependence for each table
  //   // i.e.
  //   // 1. INSERT INTO orders (with client_id already in database)
  //   //   a. Research how to use RETURNING within [1] to get new order_id back
  //   // 2. INSERT INTO menu_orders (with order_id) for each item (with quantity)
  //   // 3. Repeat Step 2 until each menu item is added
  // }

  return {
    getOrders,
    getMenu,
    getOrderDetails,
    getActiveOrders,
    getInactiveOrders,
    updateOrder
  }
}
