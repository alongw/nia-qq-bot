import { onFriendMessage, onGroupMessage } from './createMirai.js';
// 监听私聊信息
onFriendMessage((message) => {
    // console.log(message)
    if (message.data.type === 'FriendMessage') {
        console.log(message.data.messageChain[1]);
    }
});
// 监听群消息
onGroupMessage((message) => {
    console.log(message);
});
