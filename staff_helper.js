module.exports = (db) => {
  const getOrders = () => {
    return db.query(`SELECT id,status,created_at FROM orders WHERE status <> 'completed'`)
    .then((res) => {
      
      return res.rows;
    })
  };
  const getPastOrders = () => {
    return db.query(`SELECT id,status,created_at FROM orders WHERE status like '%completed%'`)
    .then((res) => {
      
      return res.rows;
    })
  };

  const updateOrder = (orderid, readytime) => {
    return db.query(`UPDATE orders SET status = 'workinpogress', ready_at = ${readytime}  WHERE id = ${orderid}`)
    .then (res => {
      console.log("from query", res.rows);
      return res.rows;
    })
  };

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
