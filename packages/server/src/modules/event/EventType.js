import { globalIdField } from "graphql-relay";
import { connectionDefinitions } from "../CustomConnectionType";
import { nodeInterface, registerType } from "../../type/QueryType";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull
} from "graphql";

const EventType = registerType(
  new GraphQLObjectType({
    name: "Event", // It seems some error with this type, which "name" is not found, but "default" is
    fields: () => ({
      id: globalIdField("events"),
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      date: { type: GraphQLString },
      description: { type: GraphQLString },
      author: {
        type: GraphQLString,
        resolve: (obj, args, context, info) => {
          return obj.author.name;
        }
      }
    }),
    interfaces: () => [nodeInterface]
  })
);
export default EventType;

export const EventConnection = connectionDefinitions({
  name: "Event",
  nodeType: GraphQLNonNull(EventType)
});
