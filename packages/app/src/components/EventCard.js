import React from 'react';
import {ScrollView, Text} from 'react-native';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import {Environment} from 'relay-runtime';

const EventCard = ({event}) => {
  return (
    <>
      <Text>Title: {event.title}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Description: {event.description}</Text>
      <Text>Author: {event.author}</Text>
    </>
  );
};

EventCard.defaultProps = {
  title: 'TITLE',
  date: 'DATE',
  description: 'DESCRIPTION',
  author: 'AUTHOR',
};

export default EventCard;
