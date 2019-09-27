import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { generateToken } from "../../../auth";

import UserModel from "../UserModel";

export default mutationWithClientMutationId({
  name: "UserRegisterWithEmail",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    let user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) {
      return {
        error: "Email already in use"
      };
    }

    if (!name | !email | !password) {
      return {
        error: "All fields are required"
      };
    }

    user = new UserModel({
      name,
      email,
      password
    });

    await user.save();
    console.log("New user added: ", user);

    return {
      token: generateToken(user)
    };
  },
  outputFields: {
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
