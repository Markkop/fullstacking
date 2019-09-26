import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import Snackbar from 'react-native-snackbar';
import UserLoginMutation from './UserLoginMutation';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

const UserLogin = props => {
  const handleSubmit = values => {
    const {email, password} = values;

    const input = {
      email,
      password,
    };

    const onCompleted = async payload => {
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
          title: `Welcome ${payload.UserLogin.name}`,
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
    <View style={styles.card}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleSubmit(values)}>
        {({values, handleChange, handleSubmit, error}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <TextInput
              placeholder="password"
              onChangeText={handleChange('password')}
              value={values.password}
            />
            <AwesomeButtonRick
              style={styles.button}
              width={styles.button.width}
              onPress={handleSubmit}>
              Login User
            </AwesomeButtonRick>
          </>
        )}
      </Formik>
      <AwesomeButtonRick
        style={styles.button}
        width={styles.button.width}
        onPress={() => props.navigation.navigate('UserCreate')}>
        Register User
      </AwesomeButtonRick>
    </View>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {},

  button: {
    margin: 10,
    width: 200,
  },
});
