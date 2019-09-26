// This file is not being used, check schema.js
// import { RedisPubSub } from "graphql-redis-subscriptions";
import { PubSub } from "graphql-subscriptions";

export const EVENTS = {
  EVENT: {
    ADDED: "EVENT_ADDED"
  }
};

// export default new RedisPubSub();
export default new PubSub();
