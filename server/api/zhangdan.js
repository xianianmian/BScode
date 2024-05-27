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

function getbszhangdandata(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    var sql = 'select * from bszhangdan '
    db.query(sql,(err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      // console.log(data,'nnn')
      res.send(data)
  })
  }
}
function pushbszhangdandata(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    //req.body从params中获取参数，req.query从url中获取参数
    var sql = `insert into bszhangdan (userid,goodsid,isfavorite,goodsrate,ztime,zamount) values (?,?,?,?,?,?)`
    db.query(sql, [req.body.userid, req.body.goodsid, req.body.isfavorite, req.body.goodsrate, req.body.ztime, req.body.zamount], (err, data) => {
      if (err) return res.send('错误d' + err.message)
      res.send({
        status: 200,
        message: '添加成功'
      })
    })
  }

}

function updatebszhangdandata(req, res) {        //通过id更新数据

  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    console.log(req.body);
    let {goodsid,isfavorite,goodsrate,ztime,userid} = req.body
    var sql = 'UPDATE bszhangdan SET goodsrate = ?, isfavorite = ? WHERE goodsid = ? AND ztime = ? AND userid = ?'
    db.query(sql, [goodsrate,isfavorite,goodsid,ztime,userid], (err, data) => {
      if (err) {
        return res.send('错误：' + err.message)
      }
      // console.log(data);
      res.send({
        status: 200,
        message: '修改成功 lll',
      })
    })
  }


}

module.exports = {
  getbszhangdandata,
  pushbszhangdandata,
  updatebszhangdandata
}
