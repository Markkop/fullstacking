import {commitMutation, graphql} from 'react-relay';
import Environment from '../../relay/Environment';

const mutation = graphql`
  mutation UserLoginMutation($input: UserLoginWithEmailInput!) {
    UserLogin(input: $input) {
      token
      error
    }
  }
`;

function commit(input, onCompleted, onError) {
  return commitMutation(Environment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  });
}

export default {commit};
