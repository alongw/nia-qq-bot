import { CreateMiraiApi } from 'typescript-mirai-api-http'

// 读取配置文件
import configfile from './getconfig.js'
const config = configfile as { [key: string]: any };

const {
    onMessage,
    onGroupMessage,
    onFriendMessage,
    sendGroupMessage,
    sendFriendMessage
} = CreateMiraiApi(config.ip, config.port, config.key, config.qq)

export {
    onMessage,
    onGroupMessage,
    onFriendMessage,
    sendGroupMessage,
    sendFriendMessage
}