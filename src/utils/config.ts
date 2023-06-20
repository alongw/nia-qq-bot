// 获取配置文件
import fs from 'fs'
import logger from './log'
import createConfig from './../models/config/createConfig'
import getConfigFn from './../models/config/getConfig'
import type configType from './../types/configType'

const getFileError = () => {
  // 创建配置文件失败
  logger.error('配置文件创建失败!请尝试手动创建，并确保程序文件是否完整！')
  process.exit()
}

let configFileData: configType = null
// 尝试获取配置文件
try {
  fs.readFileSync('./config.yaml')
  // 有配置文件，读取内容
  if (!getConfigFn()) {
    // 配置文件读取失败
    getFileError()
  }
  configFileData = getConfigFn()
} catch (error) {
  // 无法读取配置文件
  // 创建配置文件
  const createConfigBack = createConfig()
  if (createConfigBack === 200) {
    // 创建配置文件成功
    logger.info('配置文件已成功创建，请修改根目录下config.yaml')
    process.exit()
  }
  if (createConfigBack === 500) {
    // 配置文件读取失败
    getFileError()
  }
}

export default configFileData
