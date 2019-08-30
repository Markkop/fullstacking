const Koa = require('koa');
const mongoose = require('mongoose');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
const initDB = require('./database');

initDB();

const app = new Koa();

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  ),
);

module.exports = app.listen(3000, () =>
  console.log('Running on http://localhost:3000/'),
);
