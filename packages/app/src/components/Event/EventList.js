import React, {useEffect} from 'react';
import {ScrollView, View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import Environment from '../../relay/Environment';
import EventCard from './EventCard';
import EventCreateSubscription from './EventCreateSubscription';

const EventList = props => {
  const {events} = props.query;
  useEffect(() => EventCreateSubscription(), []);
  return (
    <>
      <Text>Event List</Text>
      <ScrollView>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Create Event"
          onPress={() => props.navigation.navigate('EventCreate')}
        />
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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

export default EventListQR;
