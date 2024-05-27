
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../api/products');

router.get('/bsget',service.getProducts)
router.get('/bsgetone',service.getOneProducts)
router.put('/bspushone',service.pushOneProducts)

module.exports = router