import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import UserCreateMutation from './UserCreateMutation';
import Snackbar from 'react-native-snackbar';
import * as yup from 'yup';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

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
      console.warn(err);
    };

    UserCreateMutation.commit(input, onCompleted, onError);
  };
  return (
    <View style={styles.card}>
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
              placeholder="What's your name?"
              onChangeText={handleChange('name')}
              value={values.name}
            />

            <TextInput
              placeholder="Which email you want to be contacted?"
              onChangeText={handleChange('email')}
              value={values.email}
            />

            <TextInput
              placeholder="Your password, please"
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

            <AwesomeButtonRick
              width={styles.button.width}
              style={styles.button}
              onPress={handleSubmit}>
              Create User
            </AwesomeButtonRick>
          </>
        )}
      </Formik>
      <AwesomeButtonRick
        width={styles.button.width}
        onPress={() => props.navigation.navigate('UserLogin')}
        style={styles.button}>
        Back to login
      </AwesomeButtonRick>
    </View>
  );
};

export default UserCreate;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    margin: 10,
    width: 200,
  },
});
