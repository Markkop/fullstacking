const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const { fromGlobalId, mutationWithClientMutationId } = require("graphql-relay");
const productGraphQLType = require("./productType");
const eventGraphQLType = require("./eventType");
const Product = require("../models/Product");
const Event = require("../models/Event");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    event: {
      type: eventGraphQLType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Event.findById(fromGlobalId(args.id).id);
      }
    },
    events: {
      type: GraphQLList(eventGraphQLType),
      resolve() {
        return Event.find();
      }
    }
  }
});

const EventCreate = mutationWithClientMutationId({
  name: "EventCreate",
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    id: {
      type: GraphQLID,
      resolve: payload => payload.id
    }
  },
  mutateAndGetPayload: async ({ title, date, description }) => {
    const newEvent = new Event({
      title,
      date,
      description
    });
    const returnedObject = await newEvent.save();
    const eventId = await returnedObject._id;
    console.log(`New Event created with id: ${eventId}`); //this will be in a subscription

    return {
      id: eventId
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    EventCreate: EventCreate
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
