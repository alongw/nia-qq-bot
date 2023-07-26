import { CreateMiraiApi } from 'typescript-mirai-api-http'
import logger from './log'
import config from './config'

logger.info('正在连接Mirai')
const {
  ws,
  open,
  close,
  error,
  onMessage,
  sendFriendMessage,
  onFriendMessage,
  onGroupMessage,
  sendGroupMessage
} = CreateMiraiApi(config.bot.host, config.bot.port, config.bot.key, config.bot.qq)

open(() => {
  logger.info('Mirai连接成功')
})

close(() => {
  logger.warn('Mirai连接断开')
})

error(() => {
  logger.error('Mirai连接失败')
})

export {
  ws,
  onMessage,
  sendFriendMessage,
  onFriendMessage,
  onGroupMessage,
  sendGroupMessage
}
