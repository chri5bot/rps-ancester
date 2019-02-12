import jwt from 'jsonwebtoken';
import config from '../../config';

export default (_, args) => {
  const { username, password } = args.input;

  if (username !== config.USERNAME || password !== config.PASSWORD) {
    return;
  }

  if (!config.JWT_SECRET) {
    return;
  }

  const token = jwt.sign({ username }, config.JWT_SECRET, {});

  // eslint-disable-next-line consistent-return
  return { token };
};
