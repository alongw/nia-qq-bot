/*
 * @Author: alongw <alongw@alongw.cn>
 * @Date: 2023-06-20 21:20:00
 * @LastEditors: alongw <alongw@alongw.cn>
 * @LastEditTime: 2023-08-04 19:39:20
 * @FilePath: \nia-qqbot\src\types\configType.ts
 * @Description:
 * @license AGPL-3.0
 * Copyright (c) 2023 by ALONGW, All Rights Reserved.
 */
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
  operational_irregularities: {
    group: number[]
    addressee: number[]
    keywords: string[]
  }
}

export default configType
