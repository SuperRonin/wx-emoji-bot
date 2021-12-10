const { Sequelize, DataTypes, Op } = require("sequelize");
const {
  SQL_HOST,
  SQL_DATABASE,
  SQL_USERNAME,
  SQL_PASSWORD,
} = require("./config");

const sequelize = new Sequelize(SQL_DATABASE, SQL_USERNAME, SQL_PASSWORD, {
  host: SQL_HOST,
  dialect: "mysql",
  timezone: "+08:00",
});

const EmojiModel = sequelize.define("qun_urls", {
  room_id: DataTypes.STRING,
  room_name: DataTypes.TEXT("long"),
  from_id: DataTypes.STRING,
  emoji_url: DataTypes.TEXT("long"),
});

// 同步创建或者更新表
sequelize
  .sync({
    alter: true, // force:为true时强制删除表 alter：为true时更新表字段
    // force: true // force:为true时强制删除表 alter：为true时更新表字段
  })
  .then(async () => {});

/**
 * 创建emoji
 */
async function createEmojiModel(params) {
  const { roomId, roomName, emojiUrl, formId } = params;
  try {
    await EmojiModel.create({
      room_id: roomId,
      room_name: roomName,
      emoji_url: emojiUrl,
      from_id: formId,
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 * 获取所有emoji
 * @returns Array
 */
async function getAllEmojiModel(params) {
  const { pageIndex = 0, pageSize = 20, roomId } = params
  const total = await EmojiModel.count({
    where: {
      id: {
        [Op.gt]: 0
      }
    }
  });
  let queryDB = {
    offset: pageIndex * pageSize,
    limit: pageSize * 1,
    order: [["id", "DESC"]],
  }
  if(roomId) queryDB.where = {
    room_id: roomId
  }
  const result = await EmojiModel.findAll(queryDB);
  return {
    result,
    total
  };
}

async function onconnect() {
  try {
    console.log("开始连接");
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  createEmojiModel,
  getAllEmojiModel,
  onconnect,
};
