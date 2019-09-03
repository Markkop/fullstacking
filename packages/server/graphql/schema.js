const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const fromGlobalId = require("graphql-relay").fromGlobalId;
const productGraphQLType = require("./productType");
const eventGraphQLType = require("./eventType");
const Product = require("../models/Product");
const Event = require("../models/Event");

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
    },
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

module.exports = new GraphQLSchema({
  query: Query
});
