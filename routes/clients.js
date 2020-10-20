const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers) => {
  // Dashboard page
  router.get('/', (req, res) => {
    dbHelpers.getInactiveOrders()
    .then(data => {
      console.log('data :', data);
      // data = array of order objects to be used in .ejs
      // res.render('index', data);
      // @TODO add another promise for getActiveOrders()
      res.render('index');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  // Menu order page
  router.get('/order', (req, res) => {
    dbHelpers.getMenu()
    .then(data => {
      console.log('data :', data);
      // data = array of menu objects to be used in .ejs
      // res.render('client-order', data);
      res.render('client-order');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });
    // res.render("client-order");
  // });

  // Individual order page
  router.get('/order/:id', (req, res) => {
    dbHelpers.getMenu()
    .then(data => {
      console.log('data :', data);
      // data = array of menu objects to be used in .ejs
      // res.render('client-order-id', data);
      res.render('client-order-id');
    })
    .catch(e => {
      console.error(e);
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
