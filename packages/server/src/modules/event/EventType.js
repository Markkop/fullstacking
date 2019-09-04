const graphql = require("graphql");
const globalIdField = require("graphql-relay").globalIdField;

const { GraphQLObjectType, GraphQLString } = graphql;

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: globalIdField("events"),
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    author: { type: GraphQLString }
  })
});

module.exports = EventType;
