import {commitMutation, graphql} from 'react-relay';
import Environment from '../relay/Environment';

const mutation = graphql`
  mutation EventCreateMutation($input: EventCreateInput!) {
    EventCreate(input: $input) {
      id
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
