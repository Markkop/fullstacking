import React, {useState} from 'react';
import {FlatList, View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {graphql} from 'babel-plugin-relay/macro';
import {QueryRenderer} from 'react-relay';
import Environment from '../../relay/Environment';
import EventCard from './EventCard';

// To Do: Sort events by createdAt

const EventList = props => {
  const [events, setEvents] = useState(props.query.events);
  const [isFetchingTop, setIsFetchingTop] = useState(false);
  //let {events} = props.query;

  const onRefresh = () => {
    const {events} = props.query;

    if (props.relay.isLoading()) {
      return;
    }

    setIsFetchingTop(true);

    props.relay.refetchConnection(events.edges.length, err => {
      setIsFetchingTop(false);
    });
  };

  onEndReached = () => {
    if (!props.relay.hasMore() || props.relay.isLoading()) {
      return;
    }

    // fetch more 2
    props.relay.loadMore(2, err => {
      console.log('loadMore: ', err);
    });
  };

  renderItem = ({item}) => {
    const {node} = item;

    return <EventCard event={node} />;
  };

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
        <FlatList
          data={users.edges}
          renderItem={renderItem}
          keyExtractor={item => item.node.id}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={isFetchingTop}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={renderFooter}
        />
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
