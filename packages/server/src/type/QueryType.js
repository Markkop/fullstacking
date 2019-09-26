const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const {
  connectionArgs,
  fromGlobalId,
  nodeDefinitions
} = require("graphql-relay");
const EventModel = require("../modules/event/EventModel");
const UserType = require("../modules/user/UserType");
const UserModel = require("../modules/user/UserModel");
import EventType, { EventConnection } from "../modules/event/EventType";

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);
    // TODO - convert loaders to Loaders
    const loader = loaders[`${type}Loader`];

    return (loader && loader.load(context, id)) || null;
  },
  object => registeredTypes[object.constructor.name] || null
);

export default new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    node: nodeField,
    event: {
      type: EventType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return EventModel.findById(fromGlobalId(args.id).id);
      }
    },
    events: {
      type: EventConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return EventModel.find();
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return UserModel.findById(fromGlobalId(args.id).id);
      }
    }
  })
});
