var express = require('express')
const validate = require('../validate/user.validate')

var router = express.Router()

var controller = require('../controller/user.controller')

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', controller.create)
router.post('/create', validate.postCreate, controller.postCreate)

router.get('/:uuid', controller.get)


module.exports = router