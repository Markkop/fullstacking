const graphql = require("graphql");
const globalIdField = require("graphql-relay").globalIdField;

const { GraphQLObjectType, GraphQLString } = graphql;

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: globalIdField("products"),
    _id: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

module.exports = ProductType;
