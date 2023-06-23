import logger from './utils/log'
import config from './utils/config'
import './utils/mirai'

logger.info('nia-bot正在启动')
logger.info(`nia-bot运行在QQ:${config.bot.qq}上`)

config.plugins.forEach((e) => {
  const plugins = require(`./plugins/${e}`)
  logger.info(`正在尝试加载插件：${plugins.Name}(${e})`)
  plugins.Main && plugins.Main()
})
