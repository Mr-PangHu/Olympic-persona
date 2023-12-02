let express = require('express')
let router = express.Router()
let info = require('./API/list')
let login = require('./API/login')
let cm = require('./API/cm')
let tineng = require('./API/tineng')
let xuanba = require('./API/xuanba')

router.post('/login', login.login)
router.post('/register', login.register)
router.post('/updatePwd', login.updatePwd)

router.get('/list/getBasicInfo', info.getBasicInfo)
router.get('/list/addBasicInfo', info.addBasicInfo)
router.get('/list/deleteBasicInfo', info.deleteBasicInfo)
router.get('/list/updateBasicInfo', info.updateBasicInfo)
router.get('/list/searchName', info.searchName)
router.get('/list/getPersonInfo', info.getPersonInfo)
router.get('/list/getId', info.getId)
router.get('/list/getAthleteId', info.getAthleteId)

router.get('/cm/getCompByYear', cm.getCompByYear)
router.get('/cm/getYear', cm.getYear)
router.get('/cm/getEventById', cm.getEventById)
router.get('/cm/getResultsByEvent', cm.getResultsByEvent)

router.get('/tineng/getBasicTinengData', tineng.getBasicTinengData)
router.get('/tineng/getProTinengData', tineng.getProTinengData)

router.get('/xuanba/getPlayerData', xuanba.getPlayerData)

module.exports = router
