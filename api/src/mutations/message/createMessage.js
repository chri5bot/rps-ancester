

import MESSAGE_CREATED from '../../topics/message/index';
// eslint-disable-next-line import/no-cycle
import { pubsub } from '../../index';
import { isAuthedResolver as requireAuth } from '../../utils/permissions';

export default requireAuth(async (_, args) => {
  const { id, text } = await args.input;
  await pubsub.publish(MESSAGE_CREATED, { messageCreated: { id, text } });
  return { id, text };
});
