import Koa from "koa";
import mount from "koa-mount";
import graphqlHTTP from "koa-graphql";
import { connectDatabase } from "./database";
import { schema } from "./schema";

const app = new Koa();

router.all(
  "/graphiql",
  koaPlayground({
    endpoint: "/graphql",
    subscriptionEndpoint: "/subscriptions"
  })
);
router.all("/graphql", graphqlServer);
app.use(logger());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000/")
);

export default app;
