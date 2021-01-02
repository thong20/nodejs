var express = require('express')
var app = express()
var port = 3000

var bodyParser = require('body-parser')

var userRoute = require('./routes/user.route')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/users', userRoute)

app.use(express.static('public'))

// Bài 12 
// ===== START ROUTE =================================================

app.get('/', (req, res) => {
  res.render('index', {title: 'thong20', message: 'Hello there'})
})

// ===== END ROUTE =================================================



app.listen(port, () => {
  console.log('Server running on port:', port)
})