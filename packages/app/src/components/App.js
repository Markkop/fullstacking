import React, {Fragment} from 'react';
import {Text} from 'react-native';
import graphql from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';

import EventList from './EventList';
import EventCreate from './EventCreate';

const App = () => {
  return (
    <Fragment>
      <EventList />
      <EventCreate />
    </Fragment>
  );
};

export default App;
