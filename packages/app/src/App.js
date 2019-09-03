import React, {Fragment} from 'react';
import {Text} from 'react-native';
import graphql from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';

import Environment from './relay/Environment';

const App = ({query}) => {
  const {products} = query;

  return (
    <Fragment>
      <Text>Hello World! Product: {products[0].title}</Text>
    </Fragment>
  );
};

const AppQR = () => {
  return (
    <QueryRenderer
      environment={Environment}
      query={graphql`
        query AppQuery {
          products {
            id
            title
          }
        }
      `}
      variables={{}}
      render={({error, props}) => {
        console.log('qr: ', error, props);
        if (error) {
          return <Text>{error.toString()}</Text>;
        }

        if (props) {
          return <App query={props} />;
        }

        return <Text>loading</Text>;
      }}
    />
  );
};

export default AppQR;
