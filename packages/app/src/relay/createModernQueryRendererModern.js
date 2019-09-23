import * as React from 'react';
import {Text} from 'react-native';
import {QueryRenderer} from 'react-relay';

import Environment from './Environment';

export default function createQueryRenderer(FragmentComponent, Component, config) {
  const {query, queriesParams} = config;

  class QueryRendererWrapper extends React.Component {
    render() {
      const variables = queriesParams
        ? queriesParams(this.props)
        : config.variables;

      return (
        <QueryRenderer
          environment={Environment}
          query={query}
          variables={variables}
          render={({error, props}) => {
            if (error) {
              return <Text>{error.toString()}</Text>;
            }

            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            return <Text>loading</Text>;
          }}
        />
      );
    }
  }

  return QueryRendererWrapper;
}
