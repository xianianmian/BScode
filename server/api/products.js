
const { response } = require('express');
const { querySql, queryOne } = require('../utils/mysqlChuli');
const db = require('../db/index')
const { body, validationResult } = require('express-validator');
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED
} = require('../utils/constant');


function getProducts  (req, res,next){
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    var sql = 'select * from products'
    querySql(sql).then(response=>{
      let data = response
      res.json({
        code: CODE_SUCCESS,
        	msg: '访问',
        	data: data
      })
    })
  }
}
function getOneProducts  (req, res,next){
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    var sql = 'select * from products where id = ?'
    db.query(sql, [req.query.id] ,(err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      // console.log(data,'nnn')
      res.send(data)
  })
  }
}

function pushOneProducts (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    //req.body从params中获取参数，req.query从url中获取参数
    const {tname,txing,tdetail,tcity,tavartar,tlove,tprice,tzhonglei,num} = req.body
    var sql = `tname,txing,tdetail,tcity,tavartar,tlove,tprice,tzhonglei,num) values (?,?,?,?,?,?,?,?,?)`
    db.query(sql, [tname,txing,tdetail,tcity,tavartar,tlove,tprice,tzhonglei,num], (err, data) => {
      if (err) return res.send('错误d' + err.message)
      res.send({
        status: 200,
        message: '添加成功'
      })
    })
  }

}

module.exports ={
  getProducts,
  getOneProducts,
  pushOneProducts
}