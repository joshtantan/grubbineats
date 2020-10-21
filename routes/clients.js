const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers) => {
  // Dashboard page
  router.get('/', (req, res) => {
    const inactiveOrderPromise = dbHelpers.getInactiveOrders();
    const activeOrderPromise = dbHelpers.getActiveOrders();

    Promise.all([inactiveOrderPromise, activeOrderPromise])
    .then(orders_data => {
      console.log('orders_data:', orders_data); // @TODELETE
      const inactive_orders_data = orders_data[0];
      const active_orders_data = orders_data[1];
      const pageVars = {inactive_orders_data, active_orders_data};
      res.render('index', pageVars);
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

  // Menu order page
  router.get('/order', (req, res) => {
    dbHelpers.getMenu()
    .then(menu_data => {
      const pageVars = {menu_data};
      res.render('client-order', pageVars);
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

  // Individual order page
  router.get('/order/:id', (req, res) => {
    const orderId = req.params.id;

    dbHelpers.getOrderDetails(orderId)
    .then(order_data => {
      const pageVars = {order_data};
      res.render('client-order-id', pageVars);
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

  // POST an order
  router.post('/order', (req, res) => {
    // @TODO REPLACE PROPERTIES WITH DATA FROM client-order.ejs
    const order = {
      clientId: 1,
      menuItems: {
        1: 2,
        2: 1,
        3: 3
      }
    };

    dbHelpers.addOrder(order)
    .then(data => {
      res.redirect('/client');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  return router;
};
