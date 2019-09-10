import {graphql, requestSubscription} from 'react-relay';
import environment from '../../relay/Environment';

const EventCreateSubscription = graphql`
  subscription EventCreateSubscription {
    EventAddSubscription {
      subscription {
        id
      }
    }
  }
`;

// 3
export default () => {
  const subscriptionConfig = {
    subscription: EventCreateSubscription,
    variables: {},
    updater: proxyStore => {
      console.log(proxyStore);
    },
    onError: error => console.log(`An error occured:`, error),
  };

  requestSubscription(environment, subscriptionConfig);
};
