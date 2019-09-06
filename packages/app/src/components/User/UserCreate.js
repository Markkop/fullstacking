import React from 'react';
import {TextInput, Button, ButtonText} from 'react-native';
import {Formik} from 'formik';
import UserCreateMutation from './UserCreateMutation';

const UserCreate = () => {
  const handleSubmit = values => {
    const {name, email, password} = values;

    const input = {
      name,
      email,
      password,
    };

    const onCompleted = id => {
      // Some implementation that requires the id from
      // the new User created
      alert(JSON.stringify(id));

      // Redirect
      // this.props.navigation.navigate('UserList');
    };

    const onError = err => {
      console.error(err);
    };

    UserCreateMutation.commit(input, onCompleted, onError);
  };
  return (
    <Formik
      initialValues={{title: '', date: '', description: ''}}
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
  );
};

export default UserCreate;
