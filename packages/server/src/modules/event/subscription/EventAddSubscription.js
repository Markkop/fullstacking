import { subscriptionWithClientId } from "graphql-relay-subscription";
const EventType = require("../EventType");

import { RedisPubSub } from "graphql-redis-subscriptions";

export default subscriptionWithClientId({
  name: "EventAddSubscription",
  outputFields: {
    subscription: {
      type: EventType,
      resolve: async (source, args, context) => source // implementar uma lógica de return
    }
  },
  subscribe: () => RedisPubSub.asyncIterator("EVENT_ADDED")
});
