# Nia - QQ - Bot

## 这是什么？

这是一个基于 Mirai 和 Mirai-Api-Http 自用的 QQ 机器人插件，该项目仅供自用和学习。

他像 [Nia - API](https://github.com/alongw/nia-api) 一样，采用插件形式，但是他并没有那么的规范。

## 项目说明

项目中存在非常多的屎山与魔法以及奇怪又臃肿的代码

## 有什么用？（插件介绍）

如果有配置文件，则需要将提供的示例配置文件复制到机器人配置文件的底部。

如果要启用插件，需要在配置文件 plugins 中添加相关插件

### 机器人存活测试插件（survival_test）

向机器人发送指定命令，检测是否存活

配置文件

```yaml
survival_test:
  # 命令发送人QQ 可以是自己
  commandSender: 
  - 1287756886
  # 触发词
  command: /ping
  # 响应词
  response: pang!
```

命令发送人给机器人私聊 触发词 ，然后机器人会回复 响应词

### 消息转发插件（message_forward）

将机器人接收到的私聊信息转发给指定人或提醒指定人机器人接收到消息

配置文件

```yaml
message_forward:
  # 接收消息的人（系统不会转发接收人列表中的消息）
  addressee: 
  - 1287756886
```

警告：不要将机器人自己设置为接收人

### Mcsmanager面板对接（mcsmanager）

让 QQ 群中的成员可以管理 Mcsmanager 中的实例

开发中...

### 群友业务违规检测（operational_irregularities）

娱乐向插件，用于通过关键字正则匹配检测群友业务违规然后反馈

这个模块写死了，需要直接修改源码

配置文件

```yaml
operational_irregularities:
  # 监听 QQ 群
  group: 
    - 856942056
  # 接收通知的人
  addressee:
    - 1287756886
```

