var express = require('express')
var router = express.Router()
var pool = require('./db')


// category queries
router.get('/api/get/getcategories', (req, res, next ) => {
  pool.query(`SELECT * FROM categories 
              ORDER BY category_id DESC`, 
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.get('/api/get/getpickuplocations', (req, res, next ) => {
  pool.query(`SELECT * FROM pickup_locations 
              ORDER BY pickup_location_id DESC`, 
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

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
  pool.query(`UPDATE categories SET category_name=$2
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

router.put('/api/delete/deletepickuplocation', (req, res, next) => {
  const pickup_location_id = req.body.pickup_location_id
  pool.query(`DELETE FROM pickup_locations WHERE pickup_location_id = $1`, [ pickup_location_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.get('/api/get/getpickups', (req, res, next ) => {
  pool.query(`SELECT * FROM pickups 
              ORDER BY pickup_id DESC`, 
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

router.put('/api/delete/deletepickups', (req, res, next) => {
  const pickup_id = req.body.user_id
  pool.query(`DELETE FROM pickups WHERE pickup_id = $1`, [ pickup_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
}) 


router.post('/api/post/createpickups', (req, res, next) => {
  const values = [ 
                   req.body.order_id,
                   req.body.pickup_location_id,
                   req.body.pickup_start_time,
                   req.body.pickup_end_time,
                 ]
  pool.query(`INSERT INTO pickups(order_id, pickup_location_id, pickup_start_time, pickup_end_time)
              VALUES($1, $2, $3, $4)`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows)
  })
})

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
  pool.query(`UPDATE users SET user_fname=$2, user_lname=$3, user_phone=$4, user_password=$5, user_is_admin=$6
              WHERE user_id = $1`, values,
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

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

module.exports = router
