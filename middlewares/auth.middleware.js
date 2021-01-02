// Khi nhấn nút Login, thì trước khi điều hướng người dùng
// sang trang Users, thì ta set cookies cho người dùng

const db = require('../db')

module.exports.requireAuth = (req, res, next) => {
  if(!req.cookies.userId){
    res.redirect('/login')
    return
  }

  const user = db.get('users').find({id: req.cookies.userId}).value()

  if(!user){
    res.redirect('/login')
    return
  }

  next(); // navigate to controller.index
}