const { response } = require('express');
const db = require('../db/index')
const { querySql, queryOne } = require('../utils/mysqlChuli');
const { body, validationResult } = require('express-validator');
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED
} = require('../utils/constant');

function getshunxudata(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    var sql = 'select * from goodsshunxu '
    db.query(sql, [req.query.type] ,(err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      // console.log(data,'nnn')
      res.send(data)
  })
  }
}

module.exports = {
  getshunxudata

}
