import React from 'react';
import {TextInput, Button, ButtonText} from 'react-native';
import {Formik} from 'formik';
import UserLoginMutation from './UserLoginMutation';

const UserLogin = () => {
  const handleSubmit = values => {
    const {name, email, password} = values;

    const input = {
      name,
      email,
      password,
    };

    const onCompleted = id => {
      // Some implementation that requires the id from
      // the new User Logind
      alert(JSON.stringify(id));

      // Redirect
      // this.props.navigation.navigate('UserList');
    };

    const onError = err => {
      console.error(err);
    };

    UserLoginMutation.commit(input, onCompleted, onError);
  };
  return (
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
  );
};

export default UserLogin;
