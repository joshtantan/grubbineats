const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers) => {
  // GET dashboard page
  router.get('/', (req, res) => {
    dbHelpers.updatePastReadyOrdersToComplete()
    .then(() => {
      const inactiveOrdersPromise = dbHelpers.getInactiveOrders();
      const activeOrdersPromise = dbHelpers.getActiveOrders();

      return Promise.all([inactiveOrdersPromise, activeOrdersPromise]);
    })
    .then(orders_data => {
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

  // GET menu order page
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

  // GET individual order page
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

  // POST a new order
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
    .then(response => {
      console.log('Twilio SMS log:', response[1].body);
      res.redirect('/client');
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

  return router;
};
