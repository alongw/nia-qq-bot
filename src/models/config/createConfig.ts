// 创建配置文件
import fs from 'fs'
import logger from './../../utils/log'

const createConfig = () => {
  try {
    logger.info('正在创建配置文件...')
    const defaultConfigData = fs.readFileSync(
      './default_flie/default_config.yaml',
      'utf-8'
    )
    fs.writeFileSync('./config.yaml', defaultConfigData)
    logger.info('创建配置文件成功')
    return 200
  } catch (error) {
    logger.error('创建配置文件失败！' + error)
    return 500
  }
}

export default createConfig
