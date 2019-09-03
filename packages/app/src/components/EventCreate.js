import React from 'react';
import {TextInput, Button, ButtonText} from 'react-native';
import {Formik} from 'formik';
import EventCreateMutation from './EventCreateMutation';

const EventCreate = () => {
  const handleSubmit = values => {
    const {title, date, description} = values;

    const input = {
      title,
      date,
      description,
    };

    const onCompleted = id => {
      // Some implementation that requires the id from
      // the new event created
      alert(JSON.stringify(id));

      // Redirect
      // this.props.navigation.navigate('UserList');
    };

    const onError = err => {
      console.error(err);
    };

    EventCreateMutation.commit(input, onCompleted, onError);
  };
  return (
    <Formik
      initialValues={{title: '', date: '', description: ''}}
      onSubmit={values => handleSubmit(values)}>
      {({values, handleChange, handleSubmit}) => (
        <>
          <TextInput
            placeholder="Title"
            onChangeText={handleChange('title')}
            value={values.title}
          />
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
          <Button onPress={handleSubmit} title="Add Event"></Button>
        </>
      )}
    </Formik>
  );
};

export default EventCreate;
