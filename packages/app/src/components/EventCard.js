import React from 'react';
import {ScrollView, Text} from 'react-native';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import {Environment} from 'relay-runtime';

const EventCard = (
  title = 'TITLE',
  date = 'DATE',
  description = 'DESCRIPTION',
  author = 'AUTHOR',
) => {
  return (
    <>
      <Text>Title: {title}</Text>
      <Text>Date: {date}</Text>
      <Text>Description: {description}</Text>
      <Text>Author: {author}</Text>
    </>
  );
};

export default EventCard;
