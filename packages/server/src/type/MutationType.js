import { GraphQLObjectType } from "graphql";

import EventMutations from "../modules/event/mutation";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...EventMutations
  })
});
