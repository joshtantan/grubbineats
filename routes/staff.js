
const express = require('express');
const router  = express.Router();



module.exports = (helper) => {
  
 


router.get('/', (req, res) => {
  // do some logic
  // use the helper function
  //res.render("staff");
  helper.getOrders()
    .then(orders => {
      
       let returnobj = {'order': orders};
      //res.json(returnobj);

      helper.getPastOrders()
      .then(pastorders => {
      
        returnobj['pastorder'] = pastorders;
        //res.json(returnpastobj);
       
        res.render('staff',returnobj);
      
      });
      
      
    });

    
    
});

router.post('/', (req, res) => {
  
  let orderid = req.body.order_id;
  let readytime = req.body.completion_time;
  
  // update status and readytime in helper
  helper.updateOrder(orderid, readytime);


  helper.getOrders()
  .then(orders => {
    
     let returnobj = {'order': orders};
    //res.json(returnobj);

    helper.getPastOrders()
    .then(pastorders => {
    
      returnobj['pastorder'] = pastorders;
      //res.json(returnpastobj);
     
      res.render('staff',returnobj);
    
    });
    
    
  });



  // redirecting to staff
  res.redirect('/staff/');

  //twilio message
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const autheToken = process.env.TWILIO_ATTH_TOKEN;
  
  const client = require('twilio')(accountSid, autheToken);
  client.messages.create({
    body: 'Your order will be ready at ' + readytime,
    from:'+13137778807',
    to:'+15875748681'
  })
  .then((message) => console.log(message))
  .catch((err) => console.log(err));



  


    

});




router.get("/order/:id", (req, res) => {

  let orderid = req.params.id;
  console.log(req.params.id);
  helper.orderDetails(orderid)
  .then(details => {
    let detailObject = {detail: details};
    
    
    //res.json(detailObject);
    res.render("staff-order-id", detailObject);
  })
  //res.render("staff-order-id")
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
