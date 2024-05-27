const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../api/shunxu');

router.get('/get',service.getshunxudata)

module.exports = router