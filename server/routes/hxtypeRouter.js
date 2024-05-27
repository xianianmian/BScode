
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../api/hxtype');

router.get('/get',service.gethxtype)

module.exports = router