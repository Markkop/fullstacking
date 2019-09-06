import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import EventList from './Event/EventList';
import EventCreate from './Event/EventCreate';
import UserCreate from './User/UserCreate';
import UserLogin from './User/UserLogin';

const App = createMaterialTopTabNavigator(
  {
    EventCreate: {screen: EventCreate},
    EventList: {screen: EventList},
    UserCreate: {screen: UserCreate},
    UserLogin,
  },
  {
    initialRouteName: 'UserLogin',
  },
);

export default createAppContainer(App);
