import React from 'react';
import EventList from './Event/EventList';
import EventCreate from './Event/EventCreate';
import UserCreate from './User/UserCreate';
import UserLogin from './User/UserLogin';
import AuthLoadingScreen from './AuthLoadingScreen';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppStack = createStackNavigator({
  EventList: {screen: EventList},
  EventCreate: {screen: EventCreate},
  UserCreate: {screen: UserCreate},
});
const AuthStack = createStackNavigator({UserLogin: {screen: UserLogin}});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

EventList.navigationOptions = {
  header: null,
};

EventCreate.navigationOptions = {
  header: null,
};
