const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers) => {
  // Dashboard page
  router.get('/', (req, res) => {
    res.render('index');
  })

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
