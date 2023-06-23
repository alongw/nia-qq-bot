import config from '../../utils/config'
import { onMessage, sendFriendMessage } from '../../utils/mirai'

export const Name = '机器人存活状态测试survival_test'
export const Main = () => {
  onMessage((data) => {
    if (
      data?.data?.type == 'FriendMessage' &&
      data?.data?.messageChain[1]?.type == 'Plain' &&
      data?.data?.messageChain[1].text == config.survival_test.command &&
      config.survival_test.commandSender.includes(data?.data?.sender?.id)
    ) {
      sendFriendMessage(data.data.sender.id, [
        {
          type: 'Plain',
          text: config.survival_test.response
        }
      ])
    }
  })
}
