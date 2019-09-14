import React from 'react';
import {TextInput, Button, Text} from 'react-native';
import {Formik} from 'formik';
import UserCreateMutation from './UserCreateMutation';
import Snackbar from 'react-native-snackbar';
import * as yup from 'yup';

const UserCreate = props => {
  const handleSubmit = values => {
    const {name, email, password} = values;

    const input = {
      name,
      email,
      password,
    };

    const onCompleted = returnedObject => {
      Snackbar.show({
        title: `Nice to meet you, ${name}. Please log in`,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'green',
        color: 'white',
      });

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
        onSubmit={values => handleSubmit(values)}
        validationSchema={yup.object().shape({
          name: yup.string().required('Name is required'),
          email: yup
            .string()
            .email('Not a valid e-mail')
            .required('E-mail is required'),
          password: yup.string().required('Password is required'),
        })}>
        {({values, handleChange, handleSubmit, errors, isValid, touched}) => (
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
              secureTextEntry={true}
              value={values.password}
            />
            {/* To Do: convert this to error component */}
            {touched.name && errors.name && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
            )}
            {touched.email && errors.email && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
            )}
            {touched.password && errors.password && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.password}
              </Text>
            )}

            <Button
              onPress={handleSubmit}
              // disabled={!isValid}
              title="Create User"></Button>
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
