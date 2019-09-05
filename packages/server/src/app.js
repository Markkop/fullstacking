import "isomorphic-fetch";

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "kcors";
import graphqlHttp from "koa-graphql";
import graphqlBatchHttpWrapper from "koa-graphql-batch";
import Router from "koa-router";
import koaPlayground from "graphql-playground-middleware-koa";
import { schema } from "./schema";

const app = new Koa();
const router = new Router();

const JWT_KEY = process.env.JWT_KEY || "";

app.keys = [JWT_KEY];

const graphqlServer = graphqlHttp({ schema: schema });

router.all(
  "/graphql/batch",
  bodyParser(),
  graphqlBatchHttpWrapper(graphqlServer)
);
router.all("/graphql", graphqlServer);
router.all(
  "/graphiql",
  koaPlayground({
    endpoint: "/graphql",
    subscriptionEndpoint: "/subscriptions"
  })
);

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;
