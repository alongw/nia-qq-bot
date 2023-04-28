// command/help 帮助菜单

import { sendTextMsg } from './../message.js'

// 群信息数据 group: { id: 856942056, name: 'log', permission: 'MEMBER' } permission是自己的权限
// 发送者信息 {id: 1287756886,memberName: '阿龙小可爱',permission: 'OWNER',joinTimestamp: 1626426484,lastSpeakTimestamp: 1682662279,muteTimeRemaining: 0,group: {  }}

export const getHelp = (senderInfo: any, groupInfo: any) => {
    // 是好友
    if (groupInfo == undefined) {
        return sendTextMsg('friend', senderInfo.id, helpmsg)
    }
    // 是群聊
    if (groupInfo != undefined) {
        return sendTextMsg('group', groupInfo.id, helpmsg)
    }

}



// 帮助内容
const helpmsg = `niabot v1.0.0\n/nia help -- 打开帮助菜单\n/nia start -- 启动实例\n/nia status -- 查询实例状态`