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

function gethxdata(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    var sql = 'select * from hxdatalist where type = ?'
    db.query(sql, [req.query.type] ,(err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      // console.log(data,'nnn')
      res.send(data)
  })
  }
}
function gethxdatadetail(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    var sql = 'select * from hxdatalist where id = ? and type = ?'
    db.query(sql, [req.query.id,req.query.type] ,(err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      // console.log(data,'nnn')
      res.send(data)
  })
  }
}

function pushhxdata(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    //req.body从params中获取参数，req.query从url中获取参数
    var sql = `insert into hxdatalist (type,time,imgUrl,text) values (?,?,?,?)`
    db.query(sql, [req.body.type, req.body.time, req.body.imgUrl, req.body.text], (err, data) => {
      if (err) return res.send('错误d' + err.message)
      res.send({
        status: 200,
        message: '添加成功'
      })
    })
  }

}

function delethxdata(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    var sql = 'delete from hxdatalist where id = ?'
    db.query(sql, [req.query.id], (err, data) => {
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        status: 200,
        message: '删除成功'
      })
    })
  }



}

function updatehxdata(req, res) {        //通过id更新数据

  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    console.log(req.body);
    let {text,time,imgUrl, type, id} = req.body
    imgUrl = JSON.parse(imgUrl)
    var sql = 'update hxdatalist set text = ?, time = ?, imgUrl = ? , type = ? where id = ?'
    db.query(sql, [text,time,JSON.stringify(imgUrl), type, id], (err, data) => {
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
  gethxdata,
  gethxdatadetail,
  pushhxdata,
  delethxdata,
  updatehxdata
}
