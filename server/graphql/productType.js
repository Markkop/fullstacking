const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString} = graphql;

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
  }),
});

module.exports = ProductType;
