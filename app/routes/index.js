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
  res.render('index', {
    pageTitle: 'Join Apple Developer Program',
    user: {
      id: null,
      name: "",
      appleID: "",
      message: ""
    }
  })
})

router.get('/edit/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.render('index', {
      pageTitle: 'Update your details',
      user: {
        id: result.id,
        name: result.name,
        appleID: result.appleID,
        message: result.message
      }
    })
  })
})

router.post('/', (req, res) => {

  console.log('Updating:', req.body.id)
  if (req.body.id) {
    console.log('inside IF')

    insert({
      id: parseInt(req.body.id),
      name: req.body.name,
      appleID: req.body.appleid,
      message: req.body.message
    }, res)
  } else {
    User.max('id').then(id => {
      console.log('Max ID', id)
      insert({
        id: id + 1,
        name: req.body.name,
        appleID: req.body.appleid,
        message: req.body.message
      }, res)
    }).catch(err => {
      if (err) {
        console.log('Failed Count: ' + err)
      }
    })
  }
})

function insert(user, res) {
      console.log(user.id)
  User.insertOrUpdate(user).then(insertRes => {
    console.log('Inserted')
    res.end()
    // res.redirect('/users')
  }).catch(err => {
    if (err) {
      console.log('Failed to insert: ' + err.stack)
    }
  })
}

// func update(user, res) {
//   User.
// }



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
