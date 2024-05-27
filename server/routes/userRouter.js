

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../api/hxuser');


// 登录/注册校验
const vaildator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('password').isString().withMessage('密码类型错误')
]

// 重置密码校验
const resetPwdVaildator = [
  body('username').isString().withMessage('用户名类型错误l,用户名不能一样'),
]

// 用户登录路由
router.post('/login', vaildator, service.login);

// 用户注册路由
router.post('/register', resetPwdVaildator, service.register);

router.get('/get',service.getUser)

module.exports = router;

