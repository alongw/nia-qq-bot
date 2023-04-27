// import fs from 'fs'
// export const getconfig = () => {
//     const configfile = `
// {
//     "qq": 10001,
//     "ip": "127.0.0.1",
//     "port": 11451,
//     "key": ""
// }
// `
//     return new Promise((res, rej) => {
//         fs.readFile('./config.json', 'utf8', (err, data): object | undefined | void => {
//             if (err) {
//                 // 未找到 创建配置文件
//                 return fs.writeFile('./config.json', configfile, err => {
//                     if (err) throw err;
//                     console.log('未找到配置文件，已自动创建config.js，请修改后重新运行');
//                     process.exit(0)
//                 });
//             }
//             const filedata = JSON.parse(data)
//             return res(filedata)
//         });
//     })
// }
import fs from 'fs';
const configfile = `
    {
      "qq": 10001,
      "ip": "127.0.0.1",
      "port": 11451,
      "key": ""
    }
  `;
try {
    fs.readFileSync('./config.json', 'utf8');
}
catch (err) {
    // 未找到 创建配置文件 
    fs.writeFileSync('./config.json', configfile);
    console.log('未找到配置文件，已自动创建config.js，请修改后重新运行');
    process.exit(0);
}
const data = fs.readFileSync('./config.json', 'utf8');
const filedata = JSON.parse(data);
// console.log(`启动成功！\n当前qq号：${filedata.qq}\nMirai Http连接地址：ws://${filedata.ip}:${filedata.port}\nkey：***`);
export default filedata;
