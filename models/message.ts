// message 用于处理消息内容

import { onMessage, sendGroupMessage, sendFriendMessage } from './createMirai.js'
import { getHelp } from './command/help.js'
import useFn from './function.js'
// 读取配置文件
import configfile from './getconfig.js'
const config = configfile as { [key: string]: any };

// 监听消息
onMessage((message) => {
    // console.log(message);
    const data = message.data
    // 是群消息
    if (data.type == 'GroupMessage') isGroupMessage(data)
    // 是好友信息
    if (data.type == 'FriendMessage') isFriendMessage(data)
})

// 处理函数
// 是群消息
const isGroupMessage = (data: any) => {
    // 获取群信息数据 group: { id: 群号, name: 'log', permission: 'MEMBER' } permission是自己的权限
    const groupInfo = data.sender.group
    // 获取发送者信息 {id: 10001,memberName: 'QQ昵称',permission: 'OWNER',joinTimestamp: 1626426484,lastSpeakTimestamp: 1682662279,muteTimeRemaining: 0,group: {  }}
    const senderInfo = data.sender
    // 获取信息内容 [{ type: 'Source', id: 1702, time: 1682662757 },{ type: 'Plain', text: '66666' }]
    const messageData = data.messageChain

    // nia和/nia
    if (messageData[1].text == 'nia') {
        return sendTextMsg('group', groupInfo.id, 'nia')
    }
    if (messageData[1].text == '/nia') {
        return getHelp(senderInfo, groupInfo)
    }

    // 判断是否为命令 返回：false | -1 | { command: '命令', target: [ 'bbb', 'ccc', 'ddd' ] }
    const cmd = isBotCommand(messageData[1].text, 999)
    if (cmd) {
        console.log(cmd);
        if (cmd == -1) {
            return sendCmdErrMsg('group', groupInfo.id)
        }
        // 命令分发 调用function.js
        useFn(cmd, senderInfo, groupInfo)
    }
}

// 是好友消息
const isFriendMessage = (data: any) => {
    // 获取消息内容 [{ type: 'Source', id: 49786, time: 1682663073 },{ type: 'Plain', text: '22222333' }]
    const messageData = data.messageChain
    // 获取发送者信息 { id: 10001, nickname: 'QQ昵称', remark: '备注' }
    const senderInfo = data.sender

    // nia和/nia
    if (senderInfo.id != config.qq) {
        // 不能自己调用自己 -- 我就说怎么一直风控:((((( 原来是nia了一晚上
        if (messageData[1].text == 'nia') {
            return sendTextMsg('friend', senderInfo.id, 'nia')
        }
        if (messageData[1].text == '/nia') {
            return getHelp(senderInfo, undefined)
        }

    }

    const cmd = isBotCommand(messageData[1].text, 999)
    if (cmd) {
        // console.log(cmd);
        if (cmd == -1) {
            // todo:发送消息
            sendCmdErrMsg('friend', senderInfo.id)

        }
        // 命令分发 调用function.js
        useFn(cmd, senderInfo)
    }
}

// 功能函数
// 判断内容是否是机器人命令 isBotCommand(消息内容,值的最大个数) 返回：false | -1 | {命令,[值1,值2,...]}
// 例：传入 /nia abc def ghi jkl -- 判断开头是/nia 否则返回false；abc是command，def ghi jkl是值，如果值的个数大于设置的个数，返回-1；如果符合规则，返回对象{command,[值1,值2,...]}
const isBotCommand = (str: string, value: number = 1) => {
    const regex = /^\/nia\s+(\S+)(?:\s+(.+))?/;
    const match = regex.exec(str);
    if (match) {
        const command = match[1];
        const target = match[2] ? match[2].split(/\s+/) : [];
        if (value !== undefined && target.length > value) {
            // 是命令 但是不符合格式规则
            return -1;
        } else {
            return { command, target };
        }
    } else {
        return false;
    }
}

// 快速发送信息 sendTextMsg(type,id,msg)
export const sendTextMsg = (type: 'group' | 'friend', ID: number, msg: string) => {
    if (type == 'group') {
        sendGroupTextMessage(ID, msg)
    }
    if (type == 'friend') {
        sendFriendTextMessage(ID, msg)
    }
}

// 命令错误发送错误信息
export const sendCmdErrMsg = (type: 'group' | 'friend', ID: number) => {
    if (type == 'group') {
        sendGroupTextMessage(ID, '命令格式错误！如需帮助，请发送/nia help')
    }
    if (type == 'friend') {
        sendFriendTextMessage(ID, '命令格式错误！如需帮助，请发送/nia help')
    }
}

// 判断使用那个功能
// 见function.js

// 接口
// 发送群文字信息 sendGroupTextMessage(群号,消息内容)
export const sendGroupTextMessage = (groupID: number, message: string) => {
    sendGroupMessage(groupID, [{ type: 'Plain', text: message }])
}
// 发送好友文字信息 sendFriendTextMessage(好友QQ号,消息内容)
export const sendFriendTextMessage = (friendID: number, message: string) => {
    sendFriendMessage(friendID, [{ type: 'Plain', text: message }])
}
