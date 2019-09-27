import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { generateToken } from "../../../auth";

import UserModel from "../UserModel";

export default mutationWithClientMutationId({
  name: "UserLoginWithEmail",
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    const defaultErrorMessage = "Invalid password";

    if (!user) {
      return {
        error: "No email found"
      };
    }
    const correctPassword = user.authenticate(password);

    if (!correctPassword) {
      return {
        error: defaultErrorMessage
      };
    }

    return {
      name: user.name,
      token: generateToken(user)
    };
  },
  outputFields: {
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
