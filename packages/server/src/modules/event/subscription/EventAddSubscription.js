import { subscriptionWithClientId } from "graphql-relay-subscription";
const EventType = require("../EventType");

export default subscriptionWithClientId({
  name: "EventAddSubscription",
  outputFields: {
    subscription: {
      // pode ser outro nome que faça sentido
      type: EventType,
      resolve: async (source, args, context) => source // implementar uma lógica de return
    }
  },
  subscribe: () => PubSub.asyncIterator("MY_SUBSCRIPTION") // export o subscribe
});
