import { PubSub } from 'apollo-server-express';

import MESSAGE_CREATED from '../../topics/message/index';

const pubsub = new PubSub();

export default {
  subscribe: () => {
    console.log('yes is here');
    return pubsub.asyncIterator([MESSAGE_CREATED]);
  },
};
