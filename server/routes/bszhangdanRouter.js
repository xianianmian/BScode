const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../api/zhangdan');

router.get('/get',service.getbszhangdandata)
// router.get('/getdetail',service.gethxdatadetail)
router.post('/post',service.pushbszhangdandata)
router.put('/update',service.updatebszhangdandata)
// router.delete('/delete',service.delethxdata)

module.exports = router