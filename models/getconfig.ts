// getconfig 用于获取配置文件

import fs from 'fs';
const configfile = `
{
  "qq": 10001,
  "ip": "localhost",
  "port": 11451,
  "key": "",
  "admin": 10002,
  "mcsm": {
      "web": "http://localhost:23333",
      "apikey": "",
      "instance": [
          {
              "setid": 0,
              "note": "备注",
              "group": 114514,
              "uid": "",
              "gid": ""
          },
          {
              "setid": 1,
              "note": "张三的服务器群",
              "group": 1919810,
              "uid": "",
              "gid": ""
          },
          {
              "setid": 2,
              "note": "李四的服务器群",
              "group": 110,
              "uid": "",
              "gid": ""
          }
      ]
  }
}
    
  `;
try {
  fs.readFileSync('./config.json', 'utf8');
} catch (err) {
  // 未找到 创建配置文件 
  fs.writeFileSync('./config.json', configfile);
  console.log('未找到配置文件，已自动创建config.json，请修改后重新运行');
  process.exit(0);
}
const data = fs.readFileSync('./config.json', 'utf8');
const filedata = JSON.parse(data);

export default filedata

