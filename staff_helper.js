module.exports = (db) => {
  // get all active orders
  const getOrders = () => {
    return db.query(`SELECT id,status,created_at FROM orders WHERE status <> 'completed'`)
    .then((res) => {
      
      return res.rows;
    })
  };

  // get all past orders
  const getPastOrders = () => {
    return db.query(`SELECT id,status,created_at FROM orders WHERE status like '%completed%'`)
    .then((res) => {
      
      return res.rows;
    })
  };

  // update order with ready time
  const updateOrder = (orderid, readytime) => {
    return db.query(`UPDATE orders SET status = 'workinprogress', ready_at = ${readytime}  WHERE id = ${orderid}`)
    .then (res => {
      console.log("from query", res.rows);
      return res.rows;
    })
  };

  // get order details
  const orderDetails = (orderid) => {
    return db.query(`select url_photo, item_name , description, price_cents, menu_orders.order_id, menu_orders.quantity, orders.created_at 
    FROM menu 
    JOIN menu_orders ON menu.id = menu_orders.menu_id
    JOIN orders ON orders.id = menu_orders.order_id
    WHERE orders.id = ${orderid}
    `)
    .then (res => {
      return res.rows;
    })
  };

  
  
  return {
    getOrders,
    getPastOrders,
    updateOrder,
    orderDetails
    
  }
}
