import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import { connectionArgs, fromGlobalId, nodeDefinitions } from "graphql-relay";
import EventModel from "../modules/event/EventModel";
import UserType from "../modules/user/UserType";
import UserModel from "../modules/user/UserModel";
import EventType, { EventConnection } from "../modules/event/EventType";

const registeredTypes = {}; // This const is not recognized in the function bellow

// export function registerType(type) {
//   console.log(type)
//   registeredTypes[type.name] = type;
//   return type;
// }

export const { nodeField, nodeInterface } = nodeDefinitions(object => {
  return registeredTypes[object.constructor.name] || null;
});

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
      resolve: async (parent, args) => {
        return await EventModel.find();
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
