import React from 'react';
import {TextInput, Button, ButtonText} from 'react-native';
import {Formik} from 'formik';
import UserCreateMutation from './UserCreateMutation';

const UserCreate = props => {
  const handleSubmit = values => {
    const {name, email, password} = values;

    const input = {
      name,
      email,
      password,
    };

    const onCompleted = returnedObject => {
      // Some implementation that requires the id from
      // the new User created
      alert(JSON.stringify(returnedObject));

      // Redirect
      if (returnedObject.UserCreate.token) {
        props.navigation.navigate('UserLogin');
      }
    };

    const onError = err => {
      console.error(err);
    };

    UserCreateMutation.commit(input, onCompleted, onError);
  };
  return (
    <>
      <Formik
        initialValues={{name: '', email: '', password: ''}}
        onSubmit={values => handleSubmit(values)}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <TextInput
              placeholder="Name"
              onChangeText={handleChange('name')}
              value={values.name}
            />
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
            <Button onPress={handleSubmit} title="Create User"></Button>
          </>
        )}
      </Formik>
      <Button
        onPress={() => props.navigation.navigate('UserLogin')}
        title="Back to login"></Button>
    </>
  );
};

export default UserCreate;
