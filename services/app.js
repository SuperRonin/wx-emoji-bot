const Koa = require("koa");
const Router = require("koa-router");
const { getAllEmoji } = require("./controller/qunModel");

const router = new Router();
const app = new Koa();

router.get("/emojiApi", async (ctx) => {
  ctx.body = "/";
});
router.get("/emojiApi/getAllEmoji", async (ctx) => {
  let { result, total } = await getAllEmoji(ctx.query);
  result = result.map((o) => {
    o.emoji_url = [o.emoji_url];
    return o;
  });
  ctx.body = {
    code: 0,
    message: "成功",
    type: "success",
    result: {
      items: result,
      total
    },
  };
});

app.use(router.routes());

function startServices() {
  app.listen(8805, function () {
    console.log("listen 8805");
  });
}

module.exports = {
  startServices,
};
