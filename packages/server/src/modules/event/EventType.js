import { globalIdField } from "graphql-relay";
import { connectionDefinitions } from "../CustomConnectionType";
import { nodeInterface } from "../../type/QueryType";
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: globalIdField("events"),
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: GraphQLString,
      resolve: (obj, args, context, info) => {
        // To Do: Use DataLoader to change this author field to UserType
        return obj.author.name;
      }
    }
  }),
  interfaces: () => [nodeInterface]
});

export default EventType;

export const EventConnection = connectionDefinitions({
  name: "Event",
  nodeType: GraphQLNonNull(EventType)
});
