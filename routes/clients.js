/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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
    // res.render("client-order");
  // });

  // Individual order page
  router.get('/order/:id', (req, res) => {
    res.render('client-order-id')
  });

  return router;
};
