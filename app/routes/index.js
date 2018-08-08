const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pass@123',
  database: 'AppleDatabase'
})

router.get('/', (req, res) => {
  res.render('index', {})
})

router.post('/', (req, res) => {

  const countQuery = 'SELECT count(*) AS count from users'

  const query = 'INSERT into users values (?,?,?,?)'

  connection.query(countQuery, (err, countData, fields) => {
    if (err) {
      console.log('Failed to fetch count' + err)
      res.sendStatus(500)
      return
    }
    res.end()

    const id = countData[0].count + 1
    connection.query(query, [id, req.body.name, req.body.appleid, req.body.message], (err, rows, fields) => {
      if (err) {
        console.log('Failed to fetch' + err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

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
