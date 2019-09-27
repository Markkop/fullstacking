import { GraphQLObjectType } from "graphql";

import EventMutations from "../modules/event/mutation";
import UserMutations from "../modules/user/mutation";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...EventMutations,
    ...UserMutations
  })
});
