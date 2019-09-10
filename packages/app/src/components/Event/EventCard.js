import React from 'react';
import {Text} from 'react-native';

const EventCard = ({event}) => {
  console.warn(event);
  return (
    <>
      <Text>Title: {event.title}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Description: {event.description}</Text>
      <Text>Author: {event.author ? event.author : 'anon'}</Text>
    </>
  );
};

export default EventCard;
