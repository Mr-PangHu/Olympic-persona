let express = require('express')
let router = express.Router()
let user = require('./API/user')
let info = require('./API/list')
let login = require('./API/login')

router.post('/login', login.login)
router.post('/register', login.register)
router.post('/updatePwd', login.updatePwd)

router.get('/user', user.get)
router.get('/list/all', info.all)
router.get('/list/add', info.add)
router.get('/list/del', info.del)
router.get('/list/update', info.update)

module.exports = router
