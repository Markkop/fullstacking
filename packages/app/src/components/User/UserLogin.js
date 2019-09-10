import React from 'react';
import {TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import UserLoginMutation from './UserLoginMutation';

const UserLogin = props => {
  const handleSubmit = values => {
    const {email, password} = values;

    const input = {
      email,
      password,
    };

    const onCompleted = payload => {
      const _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', payload.UserLogin.token);
      };
      _signInAsync();
      alert(JSON.stringify(payload));

      if (payload.UserLogin.token) {
        props.navigation.navigate('EventList');
      }
    };

    const onError = err => {
      console.error(err);
    };

    UserLoginMutation.commit(input, onCompleted, onError);
  };
  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleSubmit(values)}>
        {({values, handleChange, handleSubmit}) => (
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