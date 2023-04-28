// function 用于分发接收到的命令



// 导入模块
import { start as startInstance, status as checkInstanceStatus } from './command/mcsm.js'
import { getHelp } from './command/help.js'

// 群信息数据 group: { id: 856942056, name: 'log', permission: 'MEMBER' } permission是自己的权限
// 发送者信息 {id: 1287756886,memberName: '阿龙小可爱',permission: 'OWNER',joinTimestamp: 1626426484,lastSpeakTimestamp: 1682662279,muteTimeRemaining: 0,group: {  }}


// 判断使用那个功能 cmd ： {{ command: 'help', target: ['aaa', 'bbb', 'ccc'] }}
const useFn = (cmd: any, senderInfo: any, groupInfo: any | null = null) => {
    const command = cmd.command
    const commanditem = cmd.target
    if (command == 'help') {
        getHelp(senderInfo, groupInfo)

    }
    if (command == 'start') {
        // 执行start
        startInstance(senderInfo, groupInfo)

    }
    if (command == 'status') {
        // 执行status
        checkInstanceStatus(senderInfo, groupInfo)
    }
}

export default useFn