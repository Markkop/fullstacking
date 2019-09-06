import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import fetchQuery from './fetchQuery';

const websocketURL = `ws://localhost:3000/subscriptions`;
const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text;
  const subscriptionClient = new SubscriptionClient(websocketURL, {
    reconnect: true,
  });
  console.log(subscriptionClient);

  // fix: subscriptionClient does not have subscribe function
  // how to create a subscription?
  subscriptionClient.subscribe({query, variables}, (error, result) => {
    observer.onNext({data: result});
  });
};

const network = Network.create(fetchQuery, setupSubscription);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store,
});

export default env;