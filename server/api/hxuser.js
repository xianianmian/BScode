const { querySql, queryOne } = require('../utils/mysqlChuli');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const { body, validationResult } = require('express-validator');
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED
} = require('../utils/constant');
const { decode } = require('../utils/user-jwt');


// 登录
function login(req, res, next) {
  console.log(req.body);
  const err = validationResult(req);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    
    let { username, password } = req.body;
    const query = `select * from hxuser where username='${username}' and password='${password}'`;
    querySql(query)
    .then(user => {
    	// console.log('用户登录===', user);
      if (!user || user.length === 0) {
        res.json({
        	code: CODE_ERROR,
        	msg: '用户名或密码错误llllll',
        	data: null
        })
      } else {
        // 登录成功，签发一个token并返回给前端
        let token = jwt.sign({ username },PRIVATE_KEY,{ expiresIn: JWT_EXPIRED })
        let userData = {
          id: user[0].id,
          username: user[0].username,
          password:user[0].password
        };
        // console.log('token',token);
        res.json({
        	code: CODE_SUCCESS,
        	msg: '登录成功',
        	data: {
            token,
            userData
          }
        })
      }
    })
  }
}


// 注册
function register(req, res, next) {
  console.log(req.body,'sss');
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { username, password } = req.body;
    findUser(username)
  	.then(data => {
  		// console.log('用户注册===', data);
  		if (data) {
  			res.json({
	      	code: CODE_ERROR,
	      	msg: '用户已存在',
	      	data: null
	      })
  		} else {
  			const query = `insert into hxuser(username, password) values('${username}', '${password}')`;
  			querySql(query)
		    .then(result => {
		    	// console.log('用户注册===', result);
		      if (!result || result.length === 0) {
		        res.json({
		        	code: CODE_ERROR,
		        	msg: '注册失败',
		        	data: null
		        })
		      } else {
            const queryUser = `select * from hxuser where username='${username}' and password='${password}'`;
            querySql(queryUser)
            .then(user => {
              const token = jwt.sign({ username },PRIVATE_KEY,{ expiresIn: JWT_EXPIRED })
              let userData = {
                id: user[0].id,
                username: user[0].username,
                password:user[0].password
              };

              res.json({
                code: CODE_SUCCESS,
                msg: '注册成功',
                data: {
                  token,
                  userData
                }
              })
            })
		      }
		    })
  		}
  	})

  }
}

//得到
function getUser(req,res,next){
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    const query = 'select * from hxuser'
    querySql(query).then(user=>{
      
      let userData = {
        id: user[0].id,
        username: user[0].username,
        password:user[0].password
      };
      res.json({
        code: CODE_SUCCESS,
        msg: '注册成功',
        data: {
          userData
        }
      })
    })
  }
}

// 通过用户名查询用户信息
function findUser(username) {
  const query = `select id, username from hxuser where username='${username}'`;
  return queryOne(query);
}
module.exports = {
  login,
  register,
  getUser
}
