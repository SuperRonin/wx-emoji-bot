const { pareMiniProgramMsg, pareseXmlToJson } = require("./utils");
const { FileBox } = require('file-box')

module.exports = (msg, length) => {
  return new Promise((resolve, reject) => {
    // 限制非群聊
    if (!msg.payload.roomId) {
      var response;
      // 获取返回的小程序信息
      let text = msg.payload.text;
      // 格式化为xml
      let tmp = pareMiniProgramMsg(text);
      // xml转化为对象
      result = pareseXmlToJson(tmp);
      result = JSON.parse(result);
      console.log('小程序', result.msg.appmsg.weappinfo)
      let appid = result.msg.appmsg.weappinfo.appid._text || result.msg.appmsg.weappinfo.appid._cdata;
      let path = result.msg.appmsg.weappinfo.pagepath._text || result.msg.appmsg.weappinfo.pagepath._cdata;
      let weappiconurl = result.msg.appmsg.weappinfo.weappiconurl._text;
      console.log('appid:', appid)
      console.log('appid:', path)
      const FileBoxImg = FileBox.fromUrl(weappiconurl)
      if (path) {
        response = `小程序路径为：${decodeURIComponent(path)}`
      }
      msg.say(response)
      msg.say(FileBoxImg)
      // let member = msg.talker();
      // msg.room().say(response, member);
      // 返回
      resolve(response);
    }
  });
};



