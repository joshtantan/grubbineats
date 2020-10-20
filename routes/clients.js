const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers) => {
  // Dashboard page
  router.get('/', (req, res) => {
    dbHelpers.getOrders()
    .then(data => {
      console.log('in clients.js get / data:', data);
      const templateVars = {};

      data.forEach(elem => {
        templateVars[elem.id] = elem;
      });

      console.log('templateVars :', templateVars);
      res.render('index');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  // Menu order page
  router.get('/order', (req, res) => {
    res.render('client-order');
  });

  // Individual order page
  router.get('/order/:id', (req, res) => {
    res.render('client-order-id')
  });

  return router;
};
