const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pass@123',
  database: 'AppleDatabase'
})

router.get('/', (req, res) => {
  res.render('index', {})
})

router.get('/user/:id', (req, res) => {
  const query = 'SELECT * from users where id = ?'
  connection.query(query, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log('Failed to fetch' + err)
      res.sendStatus(500)
      return
    }
    res.json(rows)
  })
})

router.get('/users', (req, res) => {
  const query = 'Select * from users'

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log('Failed to fetch' + err)
      res.sendStatus(500)
      return
    }
    res.render('users', {'users': rows})
  })
})

module.exports = router
