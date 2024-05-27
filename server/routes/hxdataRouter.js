const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../api/hxdata');

router.get('/get',service.gethxdata)
router.get('/getdetail',service.gethxdatadetail)
router.post('/post',service.pushhxdata)
router.put('/update',service.updatehxdata)
router.delete('/delete',service.delethxdata)

module.exports = router