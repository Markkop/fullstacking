const Koa = require("koa");
const mongoose = require("mongoose");

const databaseUrl = "mongodb://127.0.0.1:27017/test";
mongoose.connect(databaseUrl, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log(`Connected to database: ${databaseUrl}`);
});

const app = new Koa();
app.use(async ctx => {
  ctx.body = "Hello World";
});
app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000/")
);
