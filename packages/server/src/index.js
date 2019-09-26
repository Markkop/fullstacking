/* eslint implicit-arrow-linebreak: 0 */
import "regenerator-runtime/runtime";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

import app from "./app";
import { connectDatabase } from "./database";

import { schema } from "./schema";

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.log("Could not connect to database", { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(3000, () => {
    console.log(`Server started on port :3000`);
  });

  // Subscription is not working
  SubscriptionServer.create(
    {
      onConnect: connectionParams =>
        console.log("Client subscription connected!", connectionParams),
      onDisconnect: () => console.log("Client subscription disconnected!"),
      execute,
      subscribe,
      schema
    },
    {
      server,
      path: "/subscriptions"
    }
  );
})();

let currentApp = app;

if (module.hot) {
  module.hot.accept("./index.js", () => {
    app.removeListener("request", currentApp);
    app.on("request", app);
    currentApp = app;
  });
}
