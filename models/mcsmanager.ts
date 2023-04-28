// mcsmanager mcsmanager面板操作相关功能

// 读取配置文件
import configfile from './getconfig.js'
const config = configfile as { [key: string]: any };
const { web, apikey } = config.mcsm


import axios from 'axios'
// 暴露接口
// 启动实例
export const startInstance = (uid: string, gid: string) => {
    return new Promise<void>((resolve, reject) => {
        axios({
            url: `${web}/api/protected_instance/open`,
            method: 'get',
            params: {
                uuid: uid,
                remote_uuid: gid,
                apikey: apikey
            },
        }).then(res => {
            resolve()
        }).catch(err => {
            // console.log(err.response.data); { status: 500, data: '实例未处于关闭状态，无法再进行启动', time: 1682676449125 }
            reject(err.response.data)
        })
    })
}

// 查询实例状态
export const checkInstanceStatus = (uid: string, gid: string) => {
    return new Promise<number>((resolve, reject) => {
        axios({
            url: `${web}/api/instance`,
            method: 'get',
            params: {
                uuid: uid,
                remote_uuid: gid,
                apikey: apikey
            },
        }).then(res => {
            // 会返回的值及其解释：-1（状态未知）；0（已停止）；1（正在停止）；2（正在启动）；3（正在运行）
            resolve(res.data.data.status)
            // console.log(res.data.data.status);

        }).catch(err => {
            reject()
        })
    })
}


// 测试代码
// (
//     async () => {
//         await checkInstanceStatus('45d88c13151e4c8f9010f5f6e7faf40b', 'df544e4229874712b600d4abd035b3dd')
//     }
// )()