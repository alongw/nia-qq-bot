import logger from './../../utils/log'
import config from './../../utils/config'
import {
  ws,
  onGroupMessage,
  sendGroupMessage,
  sendFriendMessage
} from './../../utils/mirai'

export const Name = '群友业务违规检测'

export const Main = () => {
  onGroupMessage((data) => {
    // 得是配置文件指定群的
    if (
      data.data.type !== 'GroupMessage' ||
      !config.operational_irregularities.group.includes(data.data.sender.group.id)
    )
      return
    // 判断是否为业务违规消息
    // 需要是文字消息
    if (data.data.messageChain[1].type !== 'Plain') return

    // 判断是否包含关键字
    if (
      !new RegExp(config.operational_irregularities.keywords.join('|'), 'i').test(
        data.data.messageChain[1].text
      )
    )
      return

    // 获取消息ID
    if (data.data.messageChain[0].type !== 'Source') return
    const msgID = data.data.messageChain[0].id

    // 发送消息
    sendGroupMessage(data.data.sender.group.id, [{ type: 'Plain', text: '业务违规！\n' }])
    ws.send(
      JSON.stringify({
        command: 'sendGroupMessage',
        syncId: 0,
        content: {
          group: data.data.sender.group.id,
          messageChain: [
            {
              type: 'Plain',
              text: `您的账号涉嫌 批量点赞/批量加好友/使用第三方客户端 等业务违规操作被限制登陆，请点击了解信息自助处理。\n\n了解详细 | 资金管理`
            }
          ],
          quote: msgID
        }
      })
    )

    // 给指定人员发送通知
    config.operational_irregularities.addressee.forEach((e) => {
      if (data.data.type !== 'GroupMessage') return
      sendFriendMessage(e, [
        {
          type: 'Plain',
          text: `[业务违规] 群友 [ ${data.data.sender.memberName} (${data.data.sender.id}) ] 尝试在群 [ ${data.data.sender.group.name} (${data.data.sender.group.id}) ] 业务违规被当场抓获！`
        }
      ])
    })
    logger.info(
      `[业务违规] 群友 [ ${data.data.sender.memberName} (${data.data.sender.id}) ] 尝试在群 [ ${data.data.sender.group.name} (${data.data.sender.group.id}) ] 业务违规被当场抓获！`
    )
  })
}
