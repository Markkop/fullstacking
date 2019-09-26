import React, {useState, useEffect} from 'react';
import {TextInput, Button, View, Text} from 'react-native';
import {Formik} from 'formik';
import EventCreateMutation from './EventCreateMutation';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

// To Do: Date + TimePicker

const DatePicker = ({value, onChange, setDate, setShow}) => {
  return (
    <DateTimePicker
      value={value}
      mode={'date'}
      is24Hour={true}
      display="default"
      onChange={val => {
        const newDate = new Date(val.nativeEvent.timestamp);
        setShow(false);
        setDate(newDate);
        onChange('date', newDate);
      }}
    />
  );
};

const EventCreate = props => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
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
        initialValues={{
          title: '',
          date: date,
          description: '',
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={yup.object().shape({
          title: yup.string().required('Title is required'),
          description: yup.string().required('Description is required'),
          date: yup.date().required('Date is required'),
        })}>
        {({
          values,
          handleChange,
          handleSubmit,
          touched,
          errors,
          setFieldValue,
        }) => (
          <>
            <TextInput
              placeholder="Title"
              onChangeText={handleChange('title')}
              value={values.title}
            />
            {/* To Do: Is there a better way to code this DatePicker? */}
            <Button
              title={date
                .toString()
                .split(' ')
                .slice(0, 4)
                .join(' ')}
              onPress={() => setShow(true)}
            />
            {show && (
              <DatePicker
                value={values.date}
                onChange={setFieldValue}
                setDate={setDate}
                setShow={setShow}
              />
            )}

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
