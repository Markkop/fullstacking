import { GraphQLObjectType } from "graphql";

import EventSubscriptions from "../modules/event/subscription";

export default new GraphQLObjectType({
  name: "Subscription",
  fields: {
    ...EventSubscriptions
  }
});
