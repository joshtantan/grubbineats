
const express = require('express');
const router  = express.Router();
const moment = require("moment");



module.exports = (helper) => {
  
 

  // get route for staff page -  /staff/
  router.get('/', (req, res) => {
  
    
    helper.updateStatusToCompletedOrder();
    // called active orders function helper
    helper.getActiveOrders()
      .then(orders => {
      
        let returnObj = {'order': orders};
        
        //called past orders function helper
        helper.getInactiveOrders()
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

    //get length from user
    let timeFromStaff = req.body.completion_time;
    
    

    // chnage length in timestamp using current date 
    let timeLength = Number(timeFromStaff);
    let myDate = new Date();
    var newDateObj = moment(myDate).add(timeLength, 'm').toDate();
   

    // update status and timeFromStaff in order table
    helper.updateStatusToAcceptedOrder(orderId, newDateObj);

    // redirecting to staff
    res.redirect('/staff/');


    //twilio message
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const autheToken = process.env.TWILIO_ATTH_TOKEN;
    
    const client = require('twilio')(accountSid, autheToken);
    client.messages.create({
      body: 'Your order will be ready at' + newDateObj,
      from:'+13137778807',
      to:'+15875748681'
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err));

  });



  // order detail route -  /staff/order/id 
  router.get("/order/:id", (req, res) => {

    let orderId = req.params.id;
    
    helper.getOrderDetails(orderId)
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
