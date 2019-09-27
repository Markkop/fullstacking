import "isomorphic-fetch";

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "kcors";
import graphqlHttp from "koa-graphql";
import graphqlBatchHttpWrapper from "koa-graphql-batch";
import Router from "koa-router";
import koaPlayground from "graphql-playground-middleware-koa";
import { schema } from "./schema";
import { getUser } from "./auth";
import * as loaders from './loader';

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async req => {
  const { currentUser } = await getUser(req.header.authorization);

  const dataloaders = Object.keys(loaders).reduce(
    (acc, loaderKey) => ({
      ...acc,
      [loaderKey]: loaders[loaderKey].getLoader(),
    }),
    {},
  );

  return {
    schema,
    context: {
      currentUser,
      req,
      dataloaders
    }
  };
};

const graphqlServer = graphqlHttp(graphqlSettingsPerReq);

router.all(
  "/graphql/batch",
  bodyParser(),
  graphqlBatchHttpWrapper(graphqlServer)
);
router.all("/graphql", graphqlServer);
router.all(
  "/playground",
  koaPlayground({
    endpoint: "/graphql",
    subscriptionEndpoint: "ws://localhost:3000/subscriptions"
  })
);

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;
