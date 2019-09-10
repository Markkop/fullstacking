import React, {useEffect} from 'react';
import {ScrollView, View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import Environment from '../../relay/Environment';
import EventCard from './EventCard';
import EventCreateSubscription from './EventCreateSubscription';

const EventList = props => {
  const {events} = props.query;
  //useEffect(() => EventCreateSubscription(), []);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
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
