let express = require('express')
let router = express.Router()
let info = require('./API/list')
let login = require('./API/login')
let cm = require('./API/cm')
let tineng = require('./API/tineng')
let xuanba = require('./API/xuanba')
let jineng = require('./API/jineng')
let zhuanxiang = require('./API/zhuanxiang')
let shangbing = require('./API/shangbing')
let jingji = require('./API/jingji')
let compare = require('./API/compare')
let quickview = require('./API/quickview')

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
router.get('/list/getGroupMember', info.getGroupMember)
router.get('/list/getByUserId', info.getByUserId)

router.get('/cm/getCompByYear', cm.getCompByYear)
router.get('/cm/getYear', cm.getYear)
router.get('/cm/getEventById', cm.getEventById)
router.get('/cm/getResultsByEvent', cm.getResultsByEvent)

router.get('/tineng/getBasicTinengData', tineng.getBasicTinengData)
router.get('/tineng/getProTinengData', tineng.getProTinengData)

router.get('/jineng/getBodyData', jineng.getBodyData)
router.get('/jineng/getBloodData', jineng.getBloodData)
router.get('/jineng/getAerobicData', jineng.getAerobicData)

router.get('/zhuanxiang/getAthleteData', zhuanxiang.getAthleteData)
router.get('/zhuanxiang/getSummaryData', zhuanxiang.getSummaryData)
router.get('/zhuanxiang/getMetricsData', zhuanxiang.getMetricsData)
router.get('/zhuanxiang/getGroundData', zhuanxiang.getGroundData)

router.get('/shangbing/getFMSData', shangbing.getFMSData)

router.get('/jingji/getCompData', jingji.getCompData)

router.get('/xuanba/getPlayerData', xuanba.getPlayerData)

router.get('/compare/getTestDataById', compare.getTestDataById)
router.get('/compare/getTableData', compare.getTableData)

router.get('/quickview/getTestPersonInfo', quickview.getTestPersonInfo)

module.exports = router
