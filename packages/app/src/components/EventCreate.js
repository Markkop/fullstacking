import React, {Fragment, useState} from 'react';
import {Text, TextInput, Button, ButtonText} from 'react-native';
import graphql from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import {Formik} from 'formik';

import Environment from '../relay/Environment';

const EventCreate = ({query}) => {
  return (
    <Formik
      initialValues={{title: '', date: '', description: ''}}
      onSubmit={values => alert(JSON.stringify(values))}>
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

const EventCreateQR = () => {
  return (
    <QueryRenderer
      environment={Environment}
      query={graphql`
        query EventCreateQuery {
          products {
            id
            title
          }
        }
      `}
      variables={{}}
      render={({error, props}) => {
        console.log('qr: ', error, props);
        if (error) {
          return <Text>{error.toString()}</Text>;
        }

        if (props) {
          return <EventCreate query={props} />;
        }

        return <Text>loading</Text>;
      }}
    />
  );
};

export default EventCreateQR;
