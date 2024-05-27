
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../api/productdetails');

router.get('/bsget',service.getProductDetails)

module.exports = router