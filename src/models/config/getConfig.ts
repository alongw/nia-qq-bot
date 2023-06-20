// 读取配置文件
import fs from 'fs'
import logger from './../../utils/log'
import yaml from 'yaml'
import type configType from 'types/configType'

const getConfigFn = (): configType => {
  try {
    logger.info('正在读取配置文件')
    const configFileData = yaml.parse(
      fs.readFileSync('./config.yaml', 'utf-8')
    ) as configType
    return configFileData
  } catch (error) {
    logger.error('读取配置文件失败!' + error)
  }
}

export default getConfigFn
