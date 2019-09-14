import React from 'react';
import {TextInput, Button, View, Text} from 'react-native';
import {Formik} from 'formik';
import EventCreateMutation from './EventCreateMutation';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

const EventCreate = props => {
  const handleSubmit = values => {
    const {title, date, description} = values;

    const input = {
      title,
      date,
      description,
    };

    const onCompleted = async id => {
      Snackbar.show({
        title: 'Event created',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'green',
        color: 'white',
      });

      // saveEvent is used to save the event somewhere
      // so it can be added in the EventList without connection
      // To Do: change it to GraphQL's subscription instead
      const saveEvent = async () => {
        const event = {
          ...input,
          author: 'You!',
          id: Math.random(),
        };
        return await AsyncStorage.setItem('newEvent', JSON.stringify(event));
      };
      saveEvent();

      // Redirect
      props.navigation.navigate('EventList');
    };

    const onError = err => {
      console.log(err);
    };

    EventCreateMutation.commit(input, onCompleted, onError);
  };
  return (
    <>
      <Formik
        initialValues={{title: '', date: '', description: ''}}
        onSubmit={values => handleSubmit(values)}
        validationSchema={yup.object().shape({
          title: yup.string().required('Title is required'),
          description: yup.string().required('Description is required'),
          date: yup.string().required('Date is required'),
        })}>
        {({values, handleChange, handleSubmit, touched, errors}) => (
          <>
            <TextInput
              placeholder="Title"
              onChangeText={handleChange('title')}
              value={values.title}
            />
            {/* To Do: Create Date Picker */}
            <TextInput
              placeholder="Date"
              onChangeText={handleChange('date')}
              value={values.date}
            />
            <TextInput
              placeholder="Short description"
              onChangeText={handleChange('description')}
              value={values.description}
            />
            {/* To Do: convert this to error component */}
            {touched.title && errors.title && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.title}</Text>
            )}
            {touched.date && errors.date && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.date}</Text>
            )}
            {touched.description && errors.description && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.description}
              </Text>
            )}
            <Button onPress={handleSubmit} title="Add Event"></Button>
          </>
        )}
      </Formik>
      <View>
        <Button
          title="Back to List"
          onPress={() => props.navigation.navigate('EventList')}
        />
      </View>
    </>
  );
};

export default EventCreate;
