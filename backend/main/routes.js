var express = require('express')
var router = express.Router()
var pool = require('./db')


// login query
router.put('/api/get/userlogin', (req, res, next ) => {
  const values = [ req.body.user_phone,
                   req.body.user_password,
                 ]
  pool.query(`SELECT user_id, user_is_admin
              FROM users
              WHERE user_phone = $1 and user_password = $2`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

// item queries
router.get('/api/get/getitems', (req, res, next ) => {
  pool.query(`SELECT * FROM items
              ORDER BY item_id DESC`,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.post('/api/post/createitem', (req, res, next) => {
  const values = [ req.body.category_id,
                   req.body.item_name,
                   req.body.item_price,
                   req.body.item_qoh,
                   req.body.item_description,
                 ]
  pool.query(`INSERT INTO items(category_id, item_name, item_price, item_qoh, item_description)
              VALUES($1, $2, $3, $4, $5)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

router.put('/api/put/updateitem', (req, res, next) => {
  const values = [ req.body.item_id,
                   req.body.category_id,
                   req.body.item_name,
                   req.body.item_price,
                   req.body.item_qoh,
                   req.body.item_description,
                 ]
  pool.query(`UPDATE items SET category_id = $2, item_name = $3, item_price = $4, item_qoh = $5, item_description = $6
              WHERE item_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/put/updateitemqoh', (req, res, next) => {
  const values = [ req.body.item_id,
                   req.body.item_quantity,
                 ]
  pool.query(`UPDATE items SET item_qoh = item_qoh - $2
              WHERE item_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/put/decrementitem', (req, res, next) => {
  const values = [ req.body.item_id
                 ]
  pool.query(`UPDATE items SET item_qoh = (item_qoh - 1)
              WHERE item_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/delete/deleteitem', (req, res, next) => {
  const item_id = req.body.item_id
  pool.query(`DELETE FROM items WHERE item_id = $1`, [ item_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

// order queries
router.put('/api/get/getcart', (req, res, next ) => {
  const values = [ req.body.user_id,
                 ]
  pool.query(`SELECT *
              FROM orders
              WHERE user_id = $1
              and is_complete = 'false'
              ORDER BY order_datetime DESC`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/get/getorders', (req, res, next ) => {
  const values = [ req.body.user_id,
                 ]
  pool.query(`SELECT *
              FROM orders
              WHERE user_id = $1
              ORDER BY order_datetime DESC`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.post('/api/post/createorder', (req, res, next) => {
  const values = [ req.body.user_id,
                   'false'
                 ]
  pool.query(`INSERT INTO orders(user_id, order_datetime, is_complete)
              VALUES($1, NOW(), $2)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

router.put('/api/put/completeorder', (req, res, next) => {
  const values = [ req.body.order_id,
                 ]
  pool.query(`UPDATE items SET is_complete = 'true'
              WHERE order_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/delete/deleteorder', (req, res, next) => {
  const order_id = req.body.order_id
  pool.query(`DELETE FROM orders WHERE order_id = $1`, [ order_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

// items_users queries
router.put('/api/get/getfavorites', (req, res, next ) => {
  const values = [ req.body.user_id,
                 ]
  pool.query(`SELECT *
              FROM items_users f JOIN items i
              ON f.item_id = i.item_id
              WHERE user_id = $1
              ORDER BY item_user_id DESC`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/get/getfavorite', (req, res, next ) => {
  const values = [ req.body.user_id,
                   req.body.item_id,
                 ]
  pool.query(`SELECT *
              FROM items_users
              WHERE user_id = $1
              and item_id = $2`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.post('/api/post/createfavorite', (req, res, next) => {
  const values = [ req.body.user_id,
                   req.body.item_id,
                 ]
  pool.query(`INSERT INTO items_users(user_id, item_id)
              VALUES($1, $2)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

router.put('/api/delete/deletefavorite', (req, res, next) => {
  const item_user_id = req.body.item_user_id
  pool.query(`DELETE FROM items_users WHERE item_user_id = $1`, [ item_user_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

// orderline queries
router.put('/api/get/getorderlines', (req, res, next ) => {
  const values = [ req.body.order_id,
                 ]
  pool.query(`SELECT *
              FROM orderline l JOIN items i
              ON l.item_id = i.item_id
              WHERE order_id = $1
              ORDER BY orderline_id DESC`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/get/getorderlinequantites', (req, res, next ) => {
  const values = [ req.body.order_id,
                 ]
  pool.query(`SELECT l.item_id, l.item_quantity
              FROM orderline l JOIN items i
              ON l.item_id = i.item_id
              WHERE order_id = $1
              ORDER BY orderline_id DESC`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/get/getorderline', (req, res, next ) => {
  const values = [ req.body.order_id,
                   req.body.item_id
                 ]
  pool.query(`SELECT *
              FROM orderline l JOIN items i
              ON l.item_id = i.item_id
              WHERE order_id = $1
              and l.item_id = $2
              ORDER BY orderline_id DESC`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.post('/api/post/createorderline', (req, res, next) => {
  const values = [ req.body.item_id,
                   req.body.order_id,
                 ]
  pool.query(`INSERT INTO orderline(item_id, order_id, item_quantity)
              VALUES($1, $2, 1)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

router.put('/api/put/updateorderline', (req, res, next) => {
  const values = [ req.body.orderline_id,
                   req.body.item_id,
                   req.body.item_quantity
                 ]
  pool.query(`UPDATE orderline SET item_quantity = $3
              WHERE orderline_id = $1;
              
              UPDATE items SET item_qoh = (item_qoh - $3)
              WHERE item_id = $2`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/put/incrementorderline', (req, res, next) => {
  const values = [ req.body.orderline_id,
                 ]
  pool.query(`UPDATE orderline SET item_quantity = (item_quantity + 1)
              WHERE orderline_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/put/decrementorderline', (req, res, next) => {
  const values = [ req.body.orderline_id,
                 ]
  pool.query(`UPDATE orderline SET item_quantity = (item_quantity - 1)
              WHERE orderline_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/delete/deleteorderline', (req, res, next) => {
  const values = [ req.body.orderline_id,
                 ]
  pool.query(`DELETE FROM orderline WHERE orderline_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

// category queries
router.get('/api/get/getcategories', (req, res, next ) => {
  pool.query(`SELECT * FROM categories 
              ORDER BY category_id DESC`, 
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.post('/api/post/createcategory', (req, res, next) => {
  const values = [ req.body.category_name,
                 ]
  pool.query(`INSERT INTO categories(category_name)
              VALUES($1)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

router.put('/api/put/updatecategory', (req, res, next) => {
  const values = [ req.body.category_id,
                   req.body.category_name,
                 ]
  pool.query(`UPDATE categories SET category_name = $2
              WHERE category_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/delete/deletecategory', (req, res, next) => {
  const category_id = req.body.category_id
  pool.query(`DELETE FROM categories WHERE category_id = $1`, [ category_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

// user queries
router.get('/api/get/getusers', (req, res, next ) => {
  pool.query(`SELECT * FROM users 
              ORDER BY user_id DESC`, 
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.post('/api/post/createuser', (req, res, next) => {
  const values = [ req.body.user_fname,
                   req.body.user_lname,
                   req.body.user_phone,
                   req.body.user_password,
                   req.body.user_is_admin,
                 ]
  pool.query(`INSERT INTO users(user_fname, user_lname, user_phone, user_password, user_is_admin)
              VALUES($1, $2, $3, $4, $5)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

router.put('/api/put/updateuser', (req, res, next) => {
  const values = [ req.body.user_id,
                   req.body.user_fname, 
                   req.body.user_lname, 
                   req.body.user_phone, 
                   req.body.user_password,
                   req.body.user_is_admin,
                 ]
  pool.query(`UPDATE users SET user_fname = $2, user_lname = $3, user_phone = $4, user_password = $5, user_is_admin = $6
              WHERE user_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/delete/deleteuser', (req, res, next) => {
  const user_id = req.body.user_id
  pool.query(`DELETE FROM users WHERE user_id = $1`, [ user_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})
/* --------------------------------------------------------------------------
Section was coded by: Sunhee Kim
comment: establishes the api get command getpickuplocations which retrieves the pickup locations
available for the store. Function will query the sql command to select all the pickup locations listed 
in the database in an order determined by the system assigned priamry key. An admin could use this 
command for viewing and updating the pickup location descriptions and a customer would use this 
command to select a pickup location after completion of an order at checkout.
-----------------------------------------------------------------------------*/
router.get('/api/get/getpickuplocations', (req, res, next ) => {
  pool.query(`SELECT * FROM pickup_locations 
              ORDER BY pickup_location_id DESC`, 
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

/* --------------------------------------------------------------------------
Section was coded by: Sunhee Kim
comment: establishes the api post command createpickuplocation which creates a new pickup locations
available for the store. Function will query the sql command to insert into pickup_locations entity 
of the database a new instance given the provided parameter of pickup_location_parking_spot.
A system assigned autogenerated primary key will be provided for the entity instance if the entry is valid. 
An admin alone would have access to this function.
-----------------------------------------------------------------------------*/
router.post('/api/post/createpickuplocation', (req, res, next) => {


  const values = [ req.body.pickup_location_parking_spot,
                 ]
  pool.query(`INSERT INTO pickup_locations(pickup_location_parking_spot)
              VALUES($1)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

/* --------------------------------------------------------------------------
Section was coded by: Sunhee Kim
comment: establishes the api delete command deletepickuplocation which deletes a specified pickup locations
available for the store. Function will query the sql command to delete into pickup_locations entity 
of the database a new instance given the provided primary key parameter of pickup_location_id.
An admin alone would have access to this function.
-----------------------------------------------------------------------------*/
router.put('/api/delete/deletepickuplocation', (req, res, next) => {
  const pickup_location_id = req.body.pickup_location_id
  pool.query(`DELETE FROM pickup_locations WHERE pickup_location_id = $1`, [ pickup_location_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

/* --------------------------------------------------------------------------
Section was coded by: Sunhee Kim
comment: pickups is the bridging entity between pickuplocations and customer orders. 
This function establishes the api get command getpickups which retrieves the pickups
available for the store. Function will query the sql command to select all the order and 
pickuplocation combinations listed in the database determined by the system assigned priamry key. 
A customer could use this command to view their past orders.
-----------------------------------------------------------------------------*/
router.get('/api/get/getpickups', (req, res, next ) => {
  pool.query(`SELECT * FROM pickups 
              ORDER BY pickup_id DESC`, 
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

/* --------------------------------------------------------------------------
Section was coded by: Sunhee Kim
comment: pickups is the bridging entity between pickuplocations and customer orders. 
establishes the api command deletepickups which deletes a specified pickupID
available for the store. Function will query the sql command to delete into pickups entity 
of the database a new instance given the provided primary key parameter of pickup_id.
An admin alone would have access to this function.
-----------------------------------------------------------------------------*/
router.put('/api/delete/deletepickups', (req, res, next) => {
  const pickup_id = req.body.pickup_id
  pool.query(`DELETE FROM pickups WHERE pickup_id = $1`, [ pickup_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
}) 

/* --------------------------------------------------------------------------
Section was coded by: Sunhee Kim
comment: establishes the api update command updatepickuplocation which updates a specified pickup locations
available for the store. Function will query the sql command to update into pickup_locations entity 
of the database, for a given pickup_location_id match, a new pickup_location_parking_spot value.
An admin alone would have access to this function.
-----------------------------------------------------------------------------*/
router.put('/api/put/updatepickuplocation', (req, res, next) => {
  const values = [ req.body.pickup_location_id,
                   req.body.pickup_location_parking_spot, 
                 ]
  pool.query(`UPDATE pickup_locations SET pickup_location_parking_spot=$2
              WHERE pickup_location_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})
router.put('/api/delete/deleteuser', (req, res, next) => {
  const user_id = req.body.user_id
  pool.query(`DELETE FROM users WHERE user_id = $1`, [ user_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})
/* --------------------------------------------------------------------------
Section was coded by: Sunhee Kim
comment: pickups is the bridging entity between pickuplocations and customer orders. 
This establishes the api post command createpickups which creates a new order and pickup location 
combination listed for a user. Function will query the sql command to insert into pickups entity 
of the database a new instance given the provided parameters of order_id, 
pickup_location_id, pickup_start_time and pickup_end_time.
A system assigned autogenerated primary key will be provided for the entity instance if the entry is valid. 
A customer alone would have access to this function, which is triggered at checkout of their order
if they request a store pickup option.
-----------------------------------------------------------------------------*/
router.post('/api/post/createpickups', (req, res, next) => {
  const values = [ 
                   req.body.order_id,
                   req.body.pickup_location_id,
                 ]
  pool.query(`INSERT INTO pickups(order_id, pickup_location_id, pickup_start_time, pickup_end_time)
              VALUES($1, $2, NOW(), NOW() + INTERVAL '30 min')`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

/* --------------------------------------------------------------------------
Section was coded by: Sunhee Kim
comment: pickups is the bridging entity between pickuplocations and customer orders. 
This establishes the api update command updatepickups which updates a specified pickup instance
available for the store. Function will query the sql command to update into pickups entity 
of the database, for a given pickup_id match, a new order_id, pickup_location_id, 
pickup_start_time and/or pickup_end_time value.
An admin alone would have access to this function.
-----------------------------------------------------------------------------*/
router.put('/api/put/updatepickups', (req, res, next) => {
  const values = [ req.body.pickup_id, 
                  req.body.order_id,
                  req.body.pickup_location_id,
                  req.body.pickup_start_time,
                  req.body.pickup_end_time,
                 ]
  pool.query(`UPDATE pickups SET order_id=$2, pickup_location_id=$3, pickup_start_time=$4, pickup_end_time=$5
              WHERE pickup_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/put/updateorder', (req, res, next) => {
  const values = [ req.body.user_id,
                   req.body.order_id
                 ]
  pool.query(`UPDATE orders SET is_complete = 'true'
                WHERE user_id = $1
                AND order_id = $2`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

module.exports = router