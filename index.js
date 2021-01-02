var express = require('express')
var app = express()
var port = 3000

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')

const authMiddleware = require('./middlewares/auth.middleware')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/users', authMiddleware.requireAuth, userRoute) // bắt user phải login vào được trang dashboard
app.use('/login', authRoute)
app.use(express.static('public'))

// Bài 15: 17:21 
// ===== START ROUTE =================================================

app.get('/', (req, res) => {
  res.render('index', {title: 'thong20', message: 'Hello there'})
})

// ===== END ROUTE =================================================



app.listen(port, () => {
  console.log('Server running on port:', port)
})