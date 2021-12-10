const { UrlLink, MiniProgram } = require("wechaty");
const request = require("request");
const urlencode = require("urlencode");
const config = require("./config");
const miniProrReply = require("../utils/miniProReply"); // 小程序参数
const translate = require("../utils/translate"); // 百度翻译
const { rainbowFart, circle, drugInstruction } = require("../utils/txAPI"); // 天行api
const { createEmojiModel } = require("../services/mysql/index");
const { room } = require("./config");
const name = config.name;
const roomList = config.room.roomList;

// 消息监听回调
module.exports = (bot) => {
  return async function onMessage(msg) {
    // console.log('来消息了', msg.text())
    // console.log('msg.payload.fromId', msg.room().id)

    // 判断消息来自自己，直接return
    if (msg.self()) return;

    // 判断消息是黑名单,直接return
    if (config.personal.shieldList.indexOf(msg.payload.fromId.toString()) != -1)
      return;

    // 判断公众号消息屏蔽
    if (msg.payload.fromId.search("gh") != -1) {
      console.log("收到公众号消息了");
      return;
    }

    console.log('房间', msg.type())

    if (!msg.room()) {
      // 消息类型判断
      switch (msg.type()) {
        case 7:
          var reg = /^[\u4e00-\u9fa5]+$/; // 文字正则
          // 回复信息是关键字 “加群”     测试成功
          if (await isAddRoom(msg)) return;
          // 回复信息是所管理的群聊名    测试成功
          if (await isRoomName(bot, msg)) return;

          msg.say('你好啊')

          // 开启机器人
          // 添加判断 不是指定群聊的信息不触发  [不加判断机器人，机器人会回复任意所在群聊内容。。。]
          // if (msg.room()) {
          //   console.log("获取到群聊消息");
          //   // 全局消息测试 @机器人的消息转发到boss
          //   // 获取到的所有群聊关于@自己的消息会被转发到小号
          //   forwarding(bot, msg, config);
          //   if (msg.payload.roomId === "17567429798@chatroom") {
          //     console.log("获取到自己管理的群聊");
          //     roomMessageReply(msg);
          //     return;
          //   }
          // }
          break;
        case 9:
          console.log("获取到小程序"); // 测试成功
          // msg.say("获取到小程序")
          miniProrReply(msg);
          break;
        case 14:
          console.log("获取到卡片链接"); // 测试成功
          break;
        case 5:
          console.log('5', msg); // 测试成功
          let return_text = msg
            .text()
            .replace(/\s/g, "")
            .replace(/&amp;/g, "&");
          let url;
          if (return_text.indexOf("emoji") > -1) {
            url = return_text.split("cdnurl=")[1].split("designerid")[0];
            url = url.replace('"', "").replace('"', "");

            // if (url.indexOf('emoji') != -1) {

            // } else {
            //   let timestamp = new Date().getTime();
            //   request(url).pipe(fs.createWriteStream(`${dir}/${timestamp}.png`));
            // }

            console.log("检测到url", url);

            msg.say(`检测到表情包，快去下载吧 ${url}`)


            

            

            // download_img(url).then(async (res) => {
            //   console.log("result", res);
            //   // console.log(path.join(dir, Date.now() + 'jpg'))
            //   await msg.say(`检测到表情包，快去下载吧 ${res}`);
            // });
          }
          break;
        default:
          console.log("暂时不支持该类型的接收!");
          break;
      }
    }

    if (msg.room()) {
      const { roomId, fromId } = msg?.payload;
      if (!Object.values(roomList).includes(roomId)) return;
      // 消息类型判断
      switch (msg.type()) {
        case 5:
          // console.log(msg); // 测试成功
          let return_text = msg
            .text()
            .replace(/\s/g, "")
            .replace(/&amp;/g, "&");
          let url;
          if (return_text.indexOf("emoji") > -1) {
            url = return_text.split("cdnurl=")[1].split("designerid")[0];
            url = url.replace('"', "").replace('"', "");

            // console.log("检测到url", url);
            let roomName = "";
            for (const key in roomList) {
              if (Object.hasOwnProperty.call(roomList, key)) {
                const value = roomList[key];
                if (value === roomId) {
                  roomName = key;
                }
              }
            }
            // 入库
            createEmojiModel({
              roomId,
              fromId,
              roomName,
              emojiUrl: url,
            });

            // download_img(url).then(async (res) => {
            //   console.log("result", res);
            //   // console.log(path.join(dir, Date.now() + 'jpg'))
            //   await msg.say(`检测到表情包，快去下载吧 ${res}`);
            // });
          }
          break;
        case 7:
          var reg = /^[\u4e00-\u9fa5]+$/; // 文字正则
          console.log("获取到文本", msg.text());
          // 回复信息是关键字 “加群”     测试成功
          msg.text();

          if (msg.text() === "我老婆是谁") {
            msg.say(`吴小仙女`);
          }
          if (msg.text() === "我老婆生日") {
            msg.say(`11-08`);
          }

          // if (await isAddRoom(msg)) return;
          // 回复信息是所管理的群聊名    测试成功
          // if (await isRoomName(bot, msg)) return;
          // 开启机器人
          // 添加判断 不是指定群聊的信息不触发  [不加判断机器人，机器人会回复任意所在群聊内容。。。]
          // if (msg.room()) {
          //   console.log("获取到群聊消息");
          //   // 全局消息测试 @机器人的消息转发到boss
          //   // 获取到的所有群聊关于@自己的消息会被转发到小号
          //   forwarding(bot, msg, config);
          //   if (msg.payload.roomId === "17567429798@chatroom") {
          //     console.log("获取到自己管理的群聊");
          //     roomMessageReply(msg);
          //     return;
          //   }
          // }
          break;
      }
    }
  };
};

/**
 * @description 回复群聊信息 处理函数
 * @param {Object} msg 消息对象
 * @return {Promise} true-是 false-不是
 */
async function roomMessageReply(msg) {
  const room = msg.room();
  const text = msg.text();
  if (await msg.mentionSelf()) {
    // 获取消息内容，拿到整个消息文本，去掉 @名字
    const sendText = msg.text().replace("@蔚蓝", "");
    // 请求机器人接口回复
    let res = await requestRobot(sendText);
    // 返回消息，并@来自人 只可以padplus调用
    // room.say(res, msg.fromId());
    // 此处替换为群内回话
    // padlocal使用 msg函数@指定人
    // 获取@你的群友
    // let member = msg.talker();
    // 群聊@群友回复
    // msg.room().say(response,member);
    room.say(res);
  } else {
    let content = await requestRobot(msg.text());
    room.say(content);
    return;
  }

  // 指定关键字触发
  if (/互动/.test(text)) {
    room.say("互动测试");
    return;
  } else if (/彩虹屁/.test(text)) {
    let reply = await rainbowFart(params);
    room.say(reply);
    return;
  } else if (/文案/.test(text)) {
    let reply = await circle(params);
    room.say(reply);
    return;
  } else if (/蔚蓝工作室/.test(text)) {
    room.say(new UrlLink(config.personal.introUrl));
    return;
  } else if (/药品/.test(text)) {
    params.word = text.substring(2);
    console.log(params);
    let reply = await drugInstruction(params);
    room.say(reply);
    return;
  }
}

/**
 * @description 回复信息是关键字 “加群” 处理函数
 * @param {Object} msg 消息对象
 * @return {Promise} true-是 false-不是
 */
async function isAddRoom(msg) {
  // 关键字 加群 处理
  if (msg.text() == "加群") {
    let roomListName = Object.keys(roomList);
    let info = `${name}当前管理群聊有${roomListName.length}个，回复群聊名即可加入哦\n\n`;
    roomListName.map((v) => {
      info += "【" + v + "】" + "\n";
    });
    msg.say(info);
    return true;
  }
  return false;
}

/**
 * @description 回复信息是所管理的群聊名 处理函数
 * @param {Object} bot 实例对象
 * @param {Object} msg 消息对象
 * @return {Promise} true-是群聊 false-不是群聊
 */
async function isRoomName(bot, msg) {
  // 回复信息为管理的群聊名
  if (Object.keys(roomList).some((v) => v == msg.text())) {
    // 通过群聊id获取到该群聊实例
    const room = await bot.Room.find({ id: roomList[msg.text()] });
    // 获取当前room信息
    console.log(room);
    // 判断是否在房间中 在-提示并结束
    if (await room.has(msg.from())) {
      await msg.say("您已经在房间中了");
      return true;
    }

    // 发送群邀请
    await room.add(msg.from());
    await msg.say("已发送群邀请");
    return true;
  }
  return false;
}

/**
 * @description 机器人请求接口 处理函数
 * @param {String} info 发送文字
 * @return {Promise} 相应内容
 */
function requestRobot(info) {
  return new Promise((resolve, reject) => {
    let url = `https://open.drea.cc/bbsapi/chat/get?keyWord=${urlencode(info)}`;
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let res = JSON.parse(body);
        if (res.isSuccess) {
          let send = res.data.reply;
          // 免费的接口，所以需要把机器人名字替换成为自己设置的机器人名字
          send = send.replace(/Smile/g, name);
          resolve(send);
        } else {
          if (res.code == 1010) {
            resolve("没事别老艾特我，我还以为爱情来了");
          } else {
            resolve("你在说什么，我听不懂");
          }
        }
      } else {
        resolve("你在说什么，我脑子有点短路诶！");
      }
    });
  });
}

/**
 * @description 回复信息是所管理的群聊名 处理函数
 * @param {Object} bot 实例对象
 * @param {Object} msg 消息对象
 * @param {Object} config 配置文件
 */

async function forwarding(bot, msg, config) {
  let pointSelf = msg.text().search(`@${config.botName}`);
  if (pointSelf == 0) {
    let content;
    // 获取到@自己的内容
    let sendText = msg.text().replace(`@${config.botName}`, "");
    // 获取群聊名称
    let roomName = msg.room().toString().replace("Room<", "");
    let sendName = msg.from().name();
    content =
      "[群聊名称]:" +
      roomName +
      "\n" +
      "[发送人]:" +
      sendName +
      "\n" +
      "[内容]:" +
      sendText;
    // 获取转接发消息人
    const contact = await bot.Contact.find({ name: config.bossName });
    // 将消息转发
    contact.say(content);
  } else {
    return;
  }
}

// 异步执行函数，用于下载图片，接收图片地址，和文件命名方式两个参数。
async function download_img(img_url, file_name) {
  // console.log('写入路径为', path.join(dir, file_name))
  // console.log("ur;l", encodeURIComponent(img_url));
  return new Promise((resolve) => {
    request(
      `http://www.weida1996.com/getemojimg?url=${encodeURIComponent(img_url)}`,
      function (err, response, body) {
        resolve(body);
      }
    );
  });
}
