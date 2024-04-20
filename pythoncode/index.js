const { exec } = require('child_process');
exec('python index.py', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行Python脚本时出错: ${error}`);
    return;
  }
  console.log(`Python脚本执行结果: ${stdout}`);
});
