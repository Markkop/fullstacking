const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { fromGlobalId } = require("graphql-relay");
const EventType = require("../modules/event/EventType");
const EventModel = require("../modules/event/EventModel");
const UserType = require("../modules/user/UserType");
const UserModel = require("../modules/user/UserModel");

export default new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    event: {
      type: EventType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return EventModel.findById(fromGlobalId(args.id).id);
      }
    },
    events: {
      type: GraphQLList(EventType),
      resolve() {
        return EventModel.find();
      }
    },
    users: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return UserModel.findById(fromGlobalId(args.id).id);
      }
    }
  })
});
