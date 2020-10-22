
const express = require('express');
const router  = express.Router();
const moment = require("moment");

module.exports = (helper) => {
  // GET staff page route - /staff
  router.get('/', (req, res) => {
    helper.updatePastReadyOrdersToComplete()
    .then(() => {
      const activeOrdersPromise = helper.getActiveOrders();
      const inactiveOrdersPromise = helper.getInactiveOrders();

      return Promise.all([activeOrdersPromise, inactiveOrdersPromise])
    })
    .then(orders_data => {
      const active_orders_data = orders_data[0];
      const inactive_orders_data = orders_data[1];
      const pageVars = {active_orders_data, inactive_orders_data};
      res.render('staff', pageVars);
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

  // GET individual order detail route - /staff/order/:id
  router.get("/order/:id", (req, res) => {
    const orderId = req.params.id;

    helper.getOrderDetails(orderId)
    .then(details => {
      const detailObject = {detail: details};
      res.render("staff-order-id", detailObject);
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

  // POST route for staff page - /staff
  router.post('/', (req, res) => {
    const orderId = req.body.order_id;

    // get time in minutes from user
    const timeFromStaff = req.body.completion_time;

    // add time to timestamp using current date
    const timeLength = Number(timeFromStaff);
    const myDate = new Date();
    const newDateObj = moment(myDate).add(timeLength, 'm').toDate();

    // update status and timeFromStaff in orders table
    helper.updateOrderStatusToAccepted(orderId, newDateObj);

    // SMS message telling user when order will be ready
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_ATTH_TOKEN;

    const client = require('twilio')(accountSid, authToken);

    client.messages.create({
      body: 'Hey user, your order will be ready at: ' + newDateObj,
      from: '+14172724534',
      to: '+15875748681'
    })
    .then(message => {
      console.log(message.body); // Show Twilio log
      res.redirect('/staff');
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.send(e);
    });
  });

  return router;
};
