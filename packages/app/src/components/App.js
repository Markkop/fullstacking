import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import EventList from './EventList';
import EventCreate from './EventCreate';

const App = createMaterialTopTabNavigator(
  {
    EventCreate: {screen: EventCreate},
    EventList: {screen: EventList},
  },
  {
    initialRouteName: 'EventList',
  },
);

export default createAppContainer(App);
