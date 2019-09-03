import React, {Fragment, useState} from 'react';
import {Text, TextInput, Button, ButtonText} from 'react-native';
import graphql from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import {Formik} from 'formik';
import EventCreateMutation from './EventCreateMutation';

import Environment from '../relay/Environment';

const EventCreate = () => {
  const handleSubmit = values => {
    const {title, date, description} = values;

    const input = {
      title,
      date,
      description,
    };

    const onCompleted = id => {
      alert(JSON.stringify(id)); // id is being received as null

      //this.props.navigation.navigate('UserList');
    };

    const onError = err => {
      alert('onError');
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
