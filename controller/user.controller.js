const db = require('../db')

const { nanoid } = require("nanoid")
const idlength = 8

module.exports.index = (req, res) => {
  // res.send('User list')
  res.render('users/index', {
    users: db.get('users').value()
  })
}

module.exports.search = (req, res) => {
  const q = req.query.q
  var matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().includes(q.toLowerCase()))

  res.render('users/index', {
    users: matchedUsers,
    q: q
  })
}

module.exports.create = (req, res) => {
  res.render('users/create')
}

module.exports.get = (req, res) => {
  const uuid = req.params.uuid
  const user = db.get('users').find({id: uuid}).value()
  res.render('users/view', { user }) // { user } là destructuring 
}

module.exports.postCreate = (req, res) => {
  const {name, phone} = req.body
  const errors = []

  if(!name) errors.push('Name is required')
  if(!phone) errors.push('Phone is required')
  if(errors.length) {
    res.render('users/create', { 
      errors: errors,
      values: req.body
    }) // {errors} là destructuring {errors: errors}
    return
  }
  req.body.id = nanoid(idlength)
  db.get('users').push(req.body).write()
  res.redirect('/users')
}

