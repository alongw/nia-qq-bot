// createMirai 用于创建mirai实例，向外暴露相关功能
import { CreateMiraiApi } from 'typescript-mirai-api-http';
// 读取配置文件
import configfile from './getconfig.js';
const config = configfile;
const { onMessage, onGroupMessage, onFriendMessage, sendGroupMessage, sendFriendMessage } = CreateMiraiApi(config.ip, config.port, config.key, config.qq);
export { onMessage, onGroupMessage, onFriendMessage, sendGroupMessage, sendFriendMessage };
