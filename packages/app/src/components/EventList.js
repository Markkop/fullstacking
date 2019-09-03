import React from 'react';
import {ScrollView, Text} from 'react-native';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import {Environment} from 'relay-runtime';
import EventCard from './EventCard';

const EventList = () => {
  return (
    <>
      <Text>Event List</Text>
      <ScrollView>
        <EventCard />
        <EventCard />
        <EventCard />
      </ScrollView>
    </>
  );
};

export default EventList;
