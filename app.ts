// 读取配置文件
import configfile from './models/getconfig.js'
const config = configfile as { [key: string]: any };

console.log(`niabot启动成功！\n当前qq号：${config.qq}\nMirai Http连接地址：ws://${config.ip}:${config.port}\nkey：***`);

import './models/message.js'