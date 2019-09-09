import {Variables, UploadableMap} from 'react-relay';
import {RequestNode} from 'relay-runtime';
import AsyncStorage from '@react-native-community/async-storage';

export const GRAPHQL_URL = 'http://localhost:3000/graphql';

// Define a function that fetches the results of a request (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery = async (request, variables) => {
  const body = JSON.stringify({
    name: request.name, // used by graphql mock on tests
    query: request.text, // GraphQL text from input
    variables,
  });
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${AsyncStorage.getItem('userToken')}`,
  };

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body,
  });

  return await response.json();
};

export default fetchQuery;
