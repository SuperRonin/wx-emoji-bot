const { getAllEmojiModel } = require("../mysql/index")


function getAllEmoji(params) {
    return getAllEmojiModel(params)
}


module.exports = {
    getAllEmoji
}