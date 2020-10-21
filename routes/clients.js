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
      console.log ("This is inactive orders: ", inactive_orders_data)
      console.log ("This is active orders: ", active_orders_data)
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
    const menuItems = function (items) {
      let result = {}
      for (key in items) {
        if (parseInt(items[key]) !== 0) {
          result[key] = items[key]
        }
      }
      return result
    }

    const order = {
      clientId: 1,
      menuItems: menuItems(req.body)
    };

    // Twilio SMS set up
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_ATTH_TOKEN;
    const sms = require('twilio')(accountSid, authToken);

    const addOrderPromise = dbHelpers.addOrder(order);
    const sendSMSPromise = sms.messages.create({
      body: 'Hey staffer, you have a new order pending acceptance. Please refresh your page.',
      from: '+14172724534',
      to: '+16047672195'
    });

    Promise.all([addOrderPromise, sendSMSPromise])
    .then(message => {
      console.log(message);
      res.redirect('/client');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  return router;
};
