import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import EventList from './Event/EventList';
import EventCreate from './Event/EventCreate';

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
