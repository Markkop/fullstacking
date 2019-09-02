const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const fromGlobalId = require("graphql-relay").fromGlobalId;
const productGraphQLType = require("./productType");
const Product = require("../models/Product");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    product: {
      type: productGraphQLType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Product.findById(fromGlobalId(args.id).id);
      }
    },
    products: {
      type: GraphQLList(productGraphQLType),
      resolve() {
        return Product.find().lean();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query
});
