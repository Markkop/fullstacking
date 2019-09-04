const Koa = require("koa");
const mount = require("koa-mount");
const graphqlHTTP = require("koa-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");

const databaseUrl = "mongodb://127.0.0.1:27017/test";
mongoose.connect(databaseUrl, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log(`Connected to database: ${databaseUrl}`);
});

const app = new Koa();

app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  )
);

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000/")
);
