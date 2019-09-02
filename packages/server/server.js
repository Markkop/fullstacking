const Koa = require("koa");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const databaseUrl = "mongodb://127.0.0.1:27017/test";
mongoose.connect(databaseUrl, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log(`Connected to database: ${databaseUrl}`);
});

const app = new Koa();

const query = () => {
  return new Promise((resolve, reject) => {
    Product.find({}, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

app.use(async ctx => {
  const data = await query();
  ctx.body = data;
});
app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000/")
);
