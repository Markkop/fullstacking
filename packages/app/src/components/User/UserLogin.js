import React from 'react';
import {TextInput, Button, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import Snackbar from 'react-native-snackbar';
import UserLoginMutation from './UserLoginMutation';

const UserLogin = props => {
  const handleSubmit = values => {
    const {email, password} = values;

    const input = {
      email,
      password,
    };

    const onCompleted = async payload => {
      console.warn(payload);

      if (payload.UserLogin.error) {
        Snackbar.show({
          title: payload.UserLogin.error,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'red',
          color: 'white',
        });
      }

      if (payload.UserLogin.token) {
        await AsyncStorage.setItem('userToken', payload.UserLogin.token);
        Snackbar.show({
          title: `Welcome user`,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'green',
          color: 'white',
        });
        props.navigation.navigate('EventList');
      }
    };

    const onError = err => {
      console.warn(err);
    };

    UserLoginMutation.commit(input, onCompleted, onError);
  };
  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleSubmit(values)}>
        {({values, handleChange, handleSubmit, error}) => (
          <>
            <TextInput
              placeholder="email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <TextInput
              placeholder="password"
              onChangeText={handleChange('password')}
              value={values.password}
            />
            <Button onPress={handleSubmit} title="Login User"></Button>
          </>
        )}
      </Formik>
      <Button
        onPress={() => props.navigation.navigate('UserCreate')}
        title="Register User"></Button>
    </>
  );
};

export default UserLogin;
