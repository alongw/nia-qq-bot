// command/mcsm mcsmanager相关操作命令
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import configfile from './../getconfig.js';
const config = configfile;
const instancelist = config.mcsm.instance;
// 通过群号查找实例 getInstanceFromGroupId(群号) 返回 { setid: 2, note: '备注', group: 110, uid: '2333', gid: '444' }
export const getInstanceFromGroupId = (groupID) => {
    const instance = instancelist.find((e) => e.group === groupID);
    if (instance) {
        return instance;
    }
};
// 引入函数文件
import { startInstance, checkInstanceStatus } from './../mcsmanager.js';
import { sendTextMsg } from './../message.js';
// 群信息数据 group: { id: 856942056, name: 'log', permission: 'MEMBER' } permission是自己的权限
// 发送者信息 {id: 1287756886,memberName: '阿龙小可爱',permission: 'OWNER',joinTimestamp: 1626426484,lastSpeakTimestamp: 1682662279,muteTimeRemaining: 0,group: {  }}
export const start = (senderInfo, groupInfo) => {
    const groupID = groupInfo.id;
    // 查找绑定实例 返回{setid:1, note:备注, group:群, uid:uid, gid:gid} | undefined
    const instance = getInstanceFromGroupId(groupID);
    if (instance == undefined) {
        return console.log('无法找到实例！请检查配置文件！群号：' + groupID);
    }
    // 启动实例
    (() => __awaiter(void 0, void 0, void 0, function* () {
        sendTextMsg('group', instance.group, '执行实例启动.....');
        try {
            yield startInstance(instance.uid, instance.gid);
            console.log(`启动实例：${instance.note}，操作人：${senderInfo.memberName}(${senderInfo.id})，操作来源：${groupInfo.name}(${instance.group})`);
            sendTextMsg('group', instance.group, '启动命令执行成功！');
        }
        catch (error) {
            console.log(error);
            sendTextMsg('group', instance.group, `启动命令执行失败，后台返回：${error.data}`);
        }
    }))();
};
// 查询实例状态
export const status = (senderInfo, groupInfo) => {
    const groupID = groupInfo.id;
    // 查找绑定实例 返回{setid:1, note:备注, group:群, uid:uid, gid:gid} | undefined
    const instance = getInstanceFromGroupId(groupID);
    if (instance == undefined) {
        return console.log('无法找到实例！请检查配置文件！群号：' + groupID);
    }
    // 查询状态
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // 会返回的值及其解释：-1（状态未知）；0（已停止）；1（正在停止）；2（正在启动）；3（正在运行）
            const res = yield checkInstanceStatus(instance.uid, instance.gid);
            if (res == -1) {
                console.log(`查询实例状态：${instance.note}，操作人：${senderInfo.memberName}(${senderInfo.id})，操作来源：${groupInfo.name}(${instance.group})，查询结果：状态未知`);
                sendTextMsg('group', instance.group, '查询成功，当前实例状态未知');
            }
            if (res == 0) {
                console.log(`查询实例状态：${instance.note}，操作人：${senderInfo.memberName}(${senderInfo.id})，操作来源：${groupInfo.name}(${instance.group})，查询结果：已停止`);
                sendTextMsg('group', instance.group, '查询成功，当前实例已停止');
            }
            if (res == 1) {
                console.log(`查询实例状态：${instance.note}，操作人：${senderInfo.memberName}(${senderInfo.id})，操作来源：${groupInfo.name}(${instance.group})，查询结果：正在停止`);
                sendTextMsg('group', instance.group, '查询成功，当前实例正在停止');
            }
            if (res == 2) {
                console.log(`查询实例状态：${instance.note}，操作人：${senderInfo.memberName}(${senderInfo.id})，操作来源：${groupInfo.name}(${instance.group})，查询结果：正在启动`);
                sendTextMsg('group', instance.group, '查询成功，当前实例正在启动');
            }
            if (res == 3) {
                console.log(`查询实例状态：${instance.note}，操作人：${senderInfo.memberName}(${senderInfo.id})，操作来源：${groupInfo.name}(${instance.group})，查询结果：正在运行`);
                sendTextMsg('group', instance.group, '查询成功，当前实例正在运行');
            }
        }
        catch (error) {
            sendTextMsg('group', instance.group, '查询失败，请稍后再试！');
        }
    }))();
};
