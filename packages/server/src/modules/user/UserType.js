const graphql = require("graphql");
const globalIdField = require("graphql-relay").globalIdField;

const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: globalIdField("users"),
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    active: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
