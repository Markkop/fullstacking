import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Card} from 'react-native-elements';

// To Do: change the date's color to better represent
// it's proximity to the current date

const EventCard = ({event}) => {
  return (
    <View style={styles.container}>
      <Card title={event.title}>
        <Text>Date: {event.date}</Text>
        <Text>Description: {event.description}</Text>
        <Text>Author: {event.author ? event.author : 'anon'}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export default EventCard;
