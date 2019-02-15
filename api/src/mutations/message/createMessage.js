

import MESSAGE_CREATED from '../../topics/message/index';
import { pubsub } from '../../index';


export default async (_, args) => {
  const { text } = await args.input;
  await pubsub.publish(MESSAGE_CREATED, { messageCreated: { text } });
  return { text };
};
