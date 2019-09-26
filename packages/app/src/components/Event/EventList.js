import React, {useState} from 'react';
import {FlatList, View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {graphql} from 'babel-plugin-relay/macro';
import EventCard from './EventCard';
import {createQueryRendererModern} from '../../relay/createModernQueryRendererModern';

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
  // Updated: it is possible to use state hooks. To do.
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
          data={events.edges}
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

const EventListPaginationContainer = createPaginationContainer(
  EventList,
  {
    query: graphql`
      fragment EventList_query on Query {
        events(first: $count, after: $cursor)
          @connection(key: "EventList_events") {
          pageInfo {
            hasNextPage
            endCursor
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
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.query && props.query.events;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
      return {
        count,
        cursor,
      };
    },
    variables: {cursor: null},
    query: graphql`
      query EventListPaginationQuery($count: Int!, $cursor: String) {
        ...EventList_query
      }
    `,
  },
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
});

export default createQueryRendererModern(
  EventListPaginationContainer,
  EventList,
  {
    query: graphql`
      query EventListQuery($count: Int!, $cursor: String) {
        ...EventList_query
      }
    `,
    variables: {cursor: null, count: 1},
  },
);
