import React from 'react';
import {ScrollView, Text} from 'react-native';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import {Environment} from 'relay-runtime';

const EventCard = props => {
  return (
    <>
      <Text>Title: {props.title}</Text>
      <Text>Date: {props.date}</Text>
      <Text>Description: {props.description}</Text>
      <Text>Author: {props.author}</Text>
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
