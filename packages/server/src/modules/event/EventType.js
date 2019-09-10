const graphql = require("graphql");
const globalIdField = require("graphql-relay").globalIdField;
const UserType = require("../user/UserType");
const UserModel = require("../user/UserModel");

const { GraphQLObjectType, GraphQLString } = graphql;

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: globalIdField("events"),
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: GraphQLString,
      resolve: (obj, args, context, info) => {
        console.log("Obj:", obj);
        return obj.author.name;
      }
    }
  })
});

module.exports = EventType;
