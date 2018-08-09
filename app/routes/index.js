const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const ormObj = new Sequelize(
  'AppleDatabase',
  'root',
  'Pass@123', {
    dialect: 'mysql',
    logging: false
  }
)

const User = ormObj.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  appleID: {
    type: Sequelize.STRING,
    allowNull: true
  },
  message: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})

router.get('/', (req, res) => {
  res.render('index', {})
})

router.post('/', (req, res) => {
console.log('Tapped Join')

  User.max('id').then(id => {
    console.log('Max ID', id)
    User.create({
      id: id + 1,
      name: req.body.name,
      appleID: req.body.appleid,
      message: req.body.message
    }).then(insertRes => {
      console.log('Inserted')
      res.end()
      // res.redirect('/users')
    }).catch(err => {
      if (err) {
        console.log('Failed to insert: ' + err.stack)
      }
    })
  }).catch(err => {
    if (err) {
      console.log('Failed Count: ' + err)
    }
  })
})

router.get('/user/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result)
  })
})

router.delete('/users/:id', (req, res) => {
  console.log('Deletting', req.params.id)

  // res.json({status: true})
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result)
  })
})

router.get('/users', (req, res) => {
  User.findAll().then(result => {
    res.render('users', {'users': result.reverse()})
  })
})

module.exports = router
