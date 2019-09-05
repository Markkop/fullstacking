import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import EventModel from "../EventModel";

export default mutationWithClientMutationId({
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
    const newEvent = new EventModel({
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