const graphql = require("graphql");
const globalIdField = require("graphql-relay").globalIdField;
const UserType = require("../user/UserType");

const { GraphQLObjectType, GraphQLString } = graphql;

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: globalIdField("events"),
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    author: { type: UserType }
  })
});

module.exports = EventType;