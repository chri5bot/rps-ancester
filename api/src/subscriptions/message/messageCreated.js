import { PubSub } from 'apollo-server-express';

import MESSAGE_CREATED from '../../topics/message/index';

const pubsub = new PubSub();

export default {
  subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED]),
};
