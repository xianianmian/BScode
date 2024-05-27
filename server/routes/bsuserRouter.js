

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../api/bsuser');


// 登录/注册校验
const vaildator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('password').isString().withMessage('密码类型错误')
]

// 重置密码校验
// const resetPwdVaildator = [
//   body('username').isString().withMessage('用户名类型错误l'),
//   body('oldPassword').isString().withMessage('密码类型错误'),
//   body('newPassword').isString().withMessage('密码类型错误')
// ]
const resetPwdVaildator = [
  body('username').isString().withMessage('用户名类型错误l'),

]

// 用户登录路由
router.post('/bslogin', vaildator, service.bslogin);

// 用户注册路由
router.post('/bsregister', resetPwdVaildator, service.bsregister);

router.get('/bsget',service.bsgetUser)
router.put('/update',service.updateBsUserInfo)

module.exports = router;
