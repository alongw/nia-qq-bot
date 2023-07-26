import logger from './../../utils/log'
import config from './../../utils/config'
import { onFriendMessage, sendFriendMessage } from './../../utils/mirai'

export const Name = '好友私聊消息转发'

export const Main = () => {
  onFriendMessage((data) => {
    // 必须是好友消息
    if (data.data.type !== 'FriendMessage') return
    // 不能是收信人的消息
    if (config.message_forward.addressee.includes(data.data.sender.id)) return
    // 转发信息
    config.message_forward.addressee.forEach((e) => {
      if (data.data.type !== 'FriendMessage') return
      if (data.data.messageChain[1].type !== 'Plain') {
        logger.info(
          `[message_forward] 接收到来自 ${data.data.sender.nickname}(${
            data.data.sender.id
          }) 的其他类型消息，根据策略已通知相关人员(${config.message_forward.addressee.join(
            ','
          )})`
        )
        return sendFriendMessage(e, [
          {
            type: 'Plain',
            text: `[ ${data.data.sender.nickname} (${data.data.sender.id}) ] 发来一条其他消息，请前往查看！`
          }
        ])
      }
      logger.info(
        `[message_forward] 接收到来自 ${data.data.sender.nickname}(${
          data.data.sender.id
        }) 的纯文本消息 ( 消息内容：${
          data.data.messageChain[1].text
        } )，根据策略已通知相关人员(${config.message_forward.addressee.join(',')})`
      )
      return sendFriendMessage(e, [
        {
          type: 'Plain',
          text: `[ ${data.data.sender.nickname} (${data.data.sender.id}) ] 发来一条文字消息：${data.data.messageChain[1].text}`
        }
      ])
    })
  })
}
