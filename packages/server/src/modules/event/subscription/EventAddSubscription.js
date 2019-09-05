import { subscriptionWithClientId } from "graphql-relay-subscription";
const EventType = require("../EventType");

import pubSub, { EVENTS } from "../../../pubSub";

export default subscriptionWithClientId({
  name: "EventAddSubscription",
  outputFields: {
    subscription: {
      type: EventType,
      resolve: async (source, args, context) => console.log(source) // implementar uma lógica de return
    }
  },
  subscribe: () => pubSub.asyncIterator(EVENTS.EVENT.ADDED)
});
