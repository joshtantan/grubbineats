// const dbParams = require('./lib/db.js');
// const {Pool} = require('pg');
// const pool = new Pool(dbParams);


module.exports = (db) => {
  // get all active orders
  const getOrders = () => {

    const query_string = `
    SELECT id,status,created_at
    FROM orders 
    WHERE status <> 'completed'
    `;

    return db.query(query_string)
    .then((res) => {
      return res.rows;
    });
  };

  // get all past orders
  const getPastOrders = () => {

    const query_string = `
    SELECT id,status,created_at
    FROM orders 
    WHERE status LIKE '%completed%'
    `;

    return db.query(query_string)
    .then((res) => {
      return res.rows;
    });
    
  };

  // update order with ready time
  const updateOrder = (order_id, ready_time) => {

    const values = [order_id, ready_time];
    const query_string = `
    UPDATE orders
    SET status = 'workinprogress', ready_at = $2  
    WHERE id = $1
    `;

    return db.query(query_string, values)
    .then (res => {
      return res.rows;
    });
    
  };

  // get order details
  const orderDetails = (order_id) => {

    const values = [order_id];
    const query_string = `
    select url_photo, item_name , description, price_cents, menu_orders.order_id, menu_orders.quantity, orders.created_at 
    FROM menu 
    JOIN menu_orders ON menu.id = menu_orders.menu_id
    JOIN orders ON orders.id = menu_orders.order_id
    WHERE orders.id = $1
    `;

    return db.query(query_string, values)
    .then (res => {
      return res.rows;
    });
    
  };

  
  
  return {
    getOrders,
    getPastOrders,
    updateOrder,
    orderDetails
    
  }
}
