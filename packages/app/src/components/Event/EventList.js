import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {graphql} from 'babel-plugin-relay/macro';
import {createRefetchContainer} from 'react-relay';
import EventCard from './EventCard';
import createQueryRendererModern from '../../relay/createModernQueryRendererModern';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

// To Do: Sort events by createdAt

const EventList = props => {
  const [events, setEvents] = useState(props.query.events.edges);
  const [isFetchingTop, setIsFetchingTop] = useState(false);
  //let {events} = props.query;

  const onRefresh = () => {
    // const {events} = props.query;
    // Add refresh to refetch list
    addNewEvent();
  };

  onEndReached = () => {
    const refetchVariables = fragmentVariables => {
      return {
        count: fragmentVariables.count + 10,
      };
    };
    props.relay.refetch(refetchVariables);
  };

  renderItem = ({item}) => {
    const {node} = item;
    return <EventCard event={node} />;
  };

  // addNewEvent get the event object from somewhere and
  // adds it to current products list
  // To Do: change it to GraphQL's subscription instead
  const addNewEvent = async () => {
    try {
      const newEvent = await AsyncStorage.getItem('newEvent');
      if (newEvent) {
        setEvents([JSON.parse(newEvent), ...events]);
        await AsyncStorage.removeItem('newEvent');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <>
      <View style={styles.buttons}>
        <AwesomeButtonRick
          style={styles.button}
          width={styles.button.width}
          onPress={() => props.navigation.navigate('EventCreate')}>
          Create Event
        </AwesomeButtonRick>
        <AwesomeButtonRick
          style={styles.button}
          width={styles.button.width}
          onPress={async () => {
            await AsyncStorage.removeItem('userToken');
            return props.navigation.navigate('Auth');
          }}>
          Logout
        </AwesomeButtonRick>
      </View>
      <View style={styles.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.node.id}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={isFetchingTop}
          ItemSeparatorComponent={null}
          ListFooterComponent={null}
        />
      </View>
    </>
  );
};

const EventListPaginationContainer = createRefetchContainer(
  EventList,
  {
    query: graphql`
      fragment EventList_query on Query
        @argumentDefinitions(count: {type: "Int", defaultValue: 2}) {
        events(first: $count) @connection(key: "EventList_events") {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              title
              date
              description
              author
            }
          }
        }
      }
    `,
  },
  graphql`
    query EventListPaginationQuery($count: Int!) {
      ...EventList_query @arguments(count: $count)
    }
  `,
);

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

  buttons: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 60,
  },

  button: {
    width: 100,
    margin: 10,
  },
});

export default createQueryRendererModern(
  EventListPaginationContainer,
  EventList,
  {
    query: graphql`
      query EventListQuery($count: Int!) {
        ...EventList_query
      }
    `,
    variables: {count: 5},
  },
);
