// command/nuZhuang.ts 催某群友女装功能 ？？？ 暂定

import { sendTextMsg } from '../message.js'

// 群信息数据 group: { id: 群号, name: 'log', permission: 'MEMBER' } permission是自己的权限
// 发送者信息 {id: 10001,memberName: 'QQ昵称',permission: 'OWNER',joinTimestamp: 1626426484,lastSpeakTimestamp: 1682662279,muteTimeRemaining: 0,group: {  }}

export const outNvZhuang = (senderInfo: any, groupInfo: any) => {
    // 是群聊
    if (groupInfo != undefined) {
        if (groupInfo.id == 971705258) {
            return sendTextMsg('group', groupInfo.id, 'outovo女装！')
        }
    }

}
