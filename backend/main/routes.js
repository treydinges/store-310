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

router.put('/api/delete/deleteitem', (req, res, next) => {
  const item_id = req.body.item_id
  pool.query(`DELETE FROM items WHERE item_id = $1`, [ item_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

// order queries
router.get('/api/get/getorders', (req, res, next ) => {
  const values = [ req.body.user_id,
                 ]
  pool.query(`SELECT * FROM orders
              WHERE user_id = $1
              ORDER BY order_datetime DESC`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.post('/api/post/createorder', (req, res, next) => {
  const values = [ req.body.user_id,
                   req.body.order_datetime,
                 ]
  pool.query(`INSERT INTO orders(user_id, order_datetime)
              VALUES($1, $2)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
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
router.get('/api/get/getorderlines', (req, res, next ) => {
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

router.post('/api/post/createorderline', (req, res, next) => {
  const values = [ req.body.item_id,
                   req.body.order_id,
                 ]
  pool.query(`INSERT INTO orderline(item_id, order_id)
              VALUES($1, $2);
              
              UPDATE items SET item_qoh = (item_qoh - 1)
              WHERE item_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

router.put('/api/put/updateorderline', (req, res, next) => {
  const values = [ req.body.orderline_id,
                   req.body.item_id,
                   req.body.quantity
                 ]
  pool.query(`UPDATE orderline SET quantity = $3
              WHERE orderline_id = $1;
              
              UPDATE items SET item_qoh = (item_qoh - $3)
              WHERE item_id = $2`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/delete/deleteorderline', (req, res, next) => {
  const values = [ req.body.orderline_id,
                   req.body.item_id,
                   req.body.quantity
                 ]
  pool.query(`DELETE FROM orderline WHERE orderline_id = $1;
  
              UPDATE items SET item_qoh = (item_qoh + $3)
              WHERE item_id = $2`, values,
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

module.exports = router
