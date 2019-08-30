const {buildSchema} = require('graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const productGraphQLType = require('./productType');
const Product = require('../models/Product');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: productGraphQLType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
