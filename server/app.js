
const bodyParser = require('body-parser'); // 引入body-parser模块
const express = require('express'); // 引入express模块
const cors = require('cors'); // 引入cors模块
const routes = require('./routes/router'); //导入自定义路由文件，创建模块化路由
const app = express();
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors()); // 注入cors模块解决跨域
app.use('/hx',routes)
// const { exec } = require('child_process');
// exec('python index.py', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行Python脚本时出错: ${error}`);
//     return;
//   }
// });

app.listen(8081, () => {
  console.log('服务器启动成功');
  console.log('Express server running at http://127.0.0.1:8081/hx')
})




