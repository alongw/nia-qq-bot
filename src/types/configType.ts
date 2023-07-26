interface configType {
  bot: {
    qq: number
    host: string
    port: number
    key: string
  }
  plugins: string[]
  // 插件详细配置
  survival_test: {
    commandSender: number[]
    command: string
    response: string
  }
  message_forward: {
    addressee: number[]
  }
}

export default configType
