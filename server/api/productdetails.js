
const { response } = require('express');
const { querySql, queryOne } = require('../utils/mysqlChuli');
const { body, validationResult } = require('express-validator');
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED
} = require('../utils/constant');


function getProductDetails  (req, res,next){
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    var sql = 'select * from productdetails'
    querySql(sql).then(response=>{
      let data = response
      console.log(response);
      res.json({
        code: CODE_SUCCESS,
        	msg: '访问',
        	data: data
      })
    })
  }
}

module.exports ={
  getProductDetails
}