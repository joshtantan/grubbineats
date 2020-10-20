const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers) => {
  // Dashboard page
  router.get('/', (req, res) => {
    const inactiveOrderPromise = dbHelpers.getInactiveOrders();
    const activeOrderPromise = dbHelpers.getActiveOrders();

    Promise.all([inactiveOrderPromise, activeOrderPromise])
    .then(orders_data => {
      console.log('orders_data:', orders_data);
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

  // // POST an order
  // router.post('/order/:id', (req, res) => {
  //   // Extract order information from .ejs input forms
  //   // Pass appropriate variables into addOrder() below
  //   dbHelpers.addOrder()
  //   .then(() => {
  //     console.log('Finished POST route. Redirecting back to dash'); // @TODELETE
  //     res.redirect('/client');
  //   })
  //   .catch(e => {
  //     console.error(e);
  //     res.send(e);
  //   });
  // });

  return router;
};
