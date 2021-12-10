# wechaty-Robot

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://wechaty.js.org)
[![Wechaty Contributor Program](https://img.shields.io/badge/Wechaty-Contributor%20Program-green.svg)](https://wechaty.js.org/docs/contributor-program)
[![Juzi.BOT Developer Program](https://img.shields.io/badge/Wechaty%Contributor%20Program-Juzi.BOT-orange.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty/)

基于 wechaty-puppet-padlocal 的微信机器人助手
[wechaty官网示例](https://wechaty.js.org/docs/tutorials/examples)

[wachaty插件](https://github.com/wechaty/wechaty-plugin-contrib)
#### 准备
1. 准备一个可登录的微信号
2. 在线领取7天免费的试用Token：http://pad-local.com

#### 目前实现功能
- 表情包提取
  - 当发送表情包给机器人时，机器人会回复表情包下载地址
- 自动通过好友验证
  - 当有人添加机器人时，判断验证消息关键字后通过或直接通过
  - 通过验证后自动回复并介绍机器人功能
- 私聊关键字回复
  - 例如回复 `加群` 推送群聊邀请
  - 例如回复 `群聊名称` 自动拉群
- 自动聊天
  - 群聊中配置和自己的机器人聊天
  - 私聊发送消息即可聊天
- 加入群聊自动欢迎
  - 当新的小伙伴加入群聊后自动 `@[新的小伙伴]` 发一个文字欢迎
  - 关键字触发,发送个人卡片链接
  - 群内发送小程序可获取小程序`相关信息`

#### api接口

[有道翻译](https://ai.youdao.com/#/ )


[协议使用服务兼容性](https://wechaty.js.org/docs/puppet-services/compatibility/)


#### 免费token

[padlocal 7天免费（推荐）](https://github.com/padlocal/wechaty-puppet-padlocal/wiki/TOKEN-%E7%94%B3%E8%AF%B7%E6%96%B9%E6%B3%95)



#### token中文文档
[传送门](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty#21%E6%B5%81%E7%A8%8B%E6%A6%82%E8%BF%B0)
