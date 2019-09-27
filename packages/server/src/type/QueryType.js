import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from "graphql";
import { connectionArgs, fromGlobalId, nodeDefinitions } from "graphql-relay";
import EventModel from "../modules/event/EventModel";
import UserType from "../modules/user/UserType";
import UserModel from "../modules/user/UserModel";
import EventType, { EventConnection } from "../modules/event/EventType";
import { EventLoader } from "../loader";

// Not sure if these are needed
const registeredTypes = {};

export const { nodeField, nodeInterface } = nodeDefinitions(object => {
  return registeredTypes[object.constructor.name] || null;
});

// To Do: use DataLoader in resolve functions
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
      resolve: (obj, args, context) => {
        return EventLoader.loadEvents(context, args);
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
