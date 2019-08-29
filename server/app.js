const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = "Hello World, I'm Koa";
});

module.exports = app.listen(3000, () =>
  console.log('Running on http://localhost:3000/'),
);
