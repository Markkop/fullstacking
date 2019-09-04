const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { fromGlobalId } = require("graphql-relay");
const EventType = require("../modules/event/EventType");
const EventModel = require("../modules/event/EventModel");

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
    }
  })
});
