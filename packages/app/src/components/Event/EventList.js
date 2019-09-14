import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import Environment from '../../relay/Environment';
import EventCard from './EventCard';

// To Do: Sort events by createdAt

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const EventList = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState(props.query.events);
  //let {events} = props.query;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    addNewEvent();
    wait(200).then(() => setRefreshing(false));
  }, [refreshing]);

  // addNewEvent get the event object from somewhere and
  // adds it to current products list
  // To Do: change it to GraphQL's subscription instead
  const addNewEvent = async () => {
    const newEvent = await AsyncStorage.getItem('newEvent');
    if (newEvent) {
      setEvents([JSON.parse(newEvent), ...events]);
      await AsyncStorage.removeItem('newEvent');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </ScrollView>
      </View>
      <View>
        <Button
          title="Create Event"
          onPress={() => props.navigation.navigate('EventCreate')}
        />
        <Button
          title="logout"
          onPress={async () => {
            await AsyncStorage.removeItem('userToken');
            return props.navigation.navigate('Auth');
          }}
        />
      </View>
    </>
  );
};

const EventListQR = componentProps => {
  return (
    <QueryRenderer
      environment={Environment}
      query={graphql`
        query EventListQuery {
          events {
            id
            title
            date
            description
            author
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
          return (
            <EventList query={props} navigation={componentProps.navigation} />
          );
        }

        return <Text>loading</Text>;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  userContainer: {
    margin: 20,
  },
});

export default EventListQR;
