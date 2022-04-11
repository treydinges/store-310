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

router.put('/api/delete/deleteuser', (req, res, next) => {
  const user_id = req.body.user_id
  pool.query(`DELETE FROM users WHERE user_id = $1`, [ user_id ],
    (q_err, q_res) => {
      if(q_err) return next(q_err);
      res.json(q_res.rows);
  })
})

module.exports = router
