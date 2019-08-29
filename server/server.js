const Koa = require('koa');
const mongoose = require('mongoose');
const Product = require('./Product');

const app = new Koa();

mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true});

app.use(async ctx => {
  //ctx.body = "Hello World, I'm Koa";
  ctx.body = await Product.find({});
});

module.exports = app.listen(3000, () =>
  console.log('Running on http://localhost:3000/'),
);
