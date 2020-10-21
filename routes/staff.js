
const express = require('express');
const router  = express.Router();
const moment = require("moment");



module.exports = (helper) => {
  
 

  // get route for staff page -  /staff/
  router.get('/', (req, res) => {
  
    

    // called active orders function helper
    helper.getOrders()
    .then(orders => {
      
      let returnObj = {'order': orders};
      
      //called past orders function helper
      helper.getPastOrders()
      .then(pastOrders => {
      
        returnObj['pastorder'] = pastOrders;
        res.render('staff',returnObj);
      
      });
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });

  });

  // post route for staff page -  /staff/
  router.post('/', (req, res) => {
    
    let orderId = req.body.order_id;
    let timeFromStaff = req.body.completion_time;
    
    
    // get todays date
    let todayDate = moment().format('L');

    // combine todayDate and timeFromStaff to have readyTime in timestamp format
    let readyTime = "'"+todayDate +" "+ timeFromStaff + "'";
    console.log("combined time is ", readyTime);

    // update status and timeFromStaff in order table
    helper.updateOrder(orderId, readyTime);

    // redirecting to staff
    res.redirect('/staff/');


    //twilio message
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const autheToken = process.env.TWILIO_ATTH_TOKEN;
    
    const client = require('twilio')(accountSid, autheToken);
    client.messages.create({
      body: 'Your order will be ready at ' + readyTime,
      from:'+13137778807',
      to:'+15875748681'
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err));

  });



  // order detail route -  /staff/order/id 
  router.get("/order/:id", (req, res) => {

    let orderId = req.params.id;
    
    helper.orderDetails(orderId)
    .then(details => {
      let detailObject = {detail: details};
      
      
      //res.json(detailObject);
      res.render("staff-order-id", detailObject);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
  })

  return router;
};



// module.exports = (helper) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT * FROM widgets`;
//     console.log(query);
//     helper.query(query)
//       .then(data => {
//         const widgets = data.rows;
//         res.json({ widgets });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
// }
