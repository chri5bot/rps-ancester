import { PubSub } from 'apollo-server-express';

import MESSAGE_CREATED from '../../topics/message/index';

const pubsub = new PubSub();

export default async (_, args) => {
  const { text } = await args.input;
  await pubsub.publish(MESSAGE_CREATED, { messageCreated: { text } });
  return { text };
};
