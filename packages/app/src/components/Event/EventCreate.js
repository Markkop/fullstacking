import React, {useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import EventCreateMutation from './EventCreateMutation';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import {Card} from 'react-native-elements';

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
      date: date.toString(),
      description,
    };

    const onCompleted = async payload => {
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
        try {
          const event = {
            node: {
              ...input,
              author: 'You!',
              id: Math.random().toString(),
            },
          };
          return await AsyncStorage.setItem('newEvent', JSON.stringify(event));
        } catch (error) {
          console.warn(error);
        }
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
      <View style={styles.container}>
        <Card>
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
            }) => {
              return (
                <>
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
                    placeholder="Your event's title"
                    placeholderTextColor={
                      errors['title'] ? '#FF0000' : '#A9A9A9'
                    }
                    onChangeText={handleChange('title')}
                    value={values.title}
                  />

                  <TextInput
                    placeholder="A short description"
                    placeholderTextColor={
                      errors['description'] ? '#FF0000' : '#A9A9A9'
                    }
                    onChangeText={handleChange('description')}
                    value={values.description}
                  />

                  <AwesomeButtonRick
                    onPress={handleSubmit}
                    style={styles.button}
                    width={styles.button.width}>
                    Add Event
                  </AwesomeButtonRick>
                </>
              );
            }}
          </Formik>

          <AwesomeButtonRick
            style={styles.button}
            width={styles.button.width}
            onPress={() => props.navigation.navigate('EventList')}>
            Back to List
          </AwesomeButtonRick>
        </Card>
      </View>
    </>
  );
};

export default EventCreate;

// const EventCard = ({event}) => {
//   return (
//     <View style={styles.container}>
//       <Card title={event.title}>
//         <Text>Date: {event.date}</Text>
//         <Text>Description: {event.description}</Text>
//         <Text>Author: {event.author ? event.author : 'anon'}</Text>
//       </Card>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    backgroundColor: '#ecf0f1',
  },
  button: {
    margin: 10,
    width: 200,
  },
});
