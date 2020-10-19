/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // menu order page
  router.get("/order", (req, res) => {
       db.query(`SELECT * FROM menu;`)
      .then(data => {
        const menu = {menu_data: data.rows};
        console.log("this is menu : ", menu)
        res.render("client-order", menu);
        // res.json({ menu});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
    // res.render("client-order");
  // });

  //individual order page
  router.get("/order/:id", (req, res) => {
    res.render("client-order-id")
  });


  return router;
};


  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
