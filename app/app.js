let express = require('express')
let reload = require('reload')
let app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', 'app/views')

app.use(express.static('app/public'))
app.use(require('./routes/index'))

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'))
})

reload(app)
