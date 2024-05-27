
const db = require('../db/index');

//新建查询连接
function querySql(sql) {
  // const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      db.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    } catch (e) {
      reject(e);
    } finally {
      //释放连接
      // conn.end();
    }
  })
}

//查询一条语句
function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql).then(res => {
      console.log('res===',res)
      if (res && res.length > 0) {
        resolve(res[0]);
      } else {
        resolve(null);
      }
    }).catch(err => {
      reject(err);
    })
  })
}

// function insertOne(sql){
//   return new Promise((resolve,reject) => {
//     db.query(sql, (err,res)=>{

//     })
//   })
// }


module.exports = {
  querySql,
  queryOne
}
