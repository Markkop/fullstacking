import React from 'react';
import {ScrollView, Text} from 'react-native';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import Environment from '../relay/Environment';
import EventCard from './EventCard';

const EventList = ({query}) => {
  const {events} = query;
  return (
    <>
      <Text>Event List</Text>
      <ScrollView>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
    </>
  );
};

const EventListQR = () => {
  return (
    <QueryRenderer
      environment={Environment}
      query={graphql`
        query EventListQuery {
          events {
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
          return <EventList query={props} />;
        }

        return <Text>loading</Text>;
      }}
    />
  );
};

export default EventListQR;
