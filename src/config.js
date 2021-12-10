module.exports = {
  // puppet_padlocal Token
  // 机器人微信昵称
  botName: "蔚蓝",
  // 转发人
  bossName: ":)",
  bossId: "rujie121411",
  // token: "puppet_padlocal_558342776dfe4f388c0e1645245a236a",
  token: "puppet_wxwork_4394488b7aeed0c8",
  // 天行apikey
  params: {
    key: "tianxinkey",
    word: "",
  },
  // 机器人名字
  name: "蔚蓝机器人",
  // 房间/群聊
  room: {
    // 管理群组列表
    roomList: {
      // 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
      // 圈子: "20856xxxx@chatroom",
      表情包分享群: "19424548907@chatroom",
      悍匪表情包: "18383642066@chatroom",
      哈温: "24308407738@chatroom"
    },
    // 加入房间回复
    roomJoinReply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流！😊`,
  },
  // 私人
  personal: {
    // 好友验证自动通过关键字
    addFriendKeywords: ["加群", "前端"],
    shieldList: [],
    // 是否开启加群
    addRoom: true,
    // 关键字触发回复
    introUrl: {
      description: "描述",
      thumbnailUrl: "https://xxxx.png",
      title: "标题",
      url: "https://xxxx.html",
    },
  },
};
