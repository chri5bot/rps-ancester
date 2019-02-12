
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import config from './config';
import schema from './schema';

dotenv.config();

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization;

    if (!token) {
      return;
    }

    const user = await new Promise((resolve, reject) => {
      if (!config.JWT_SECRET) {
        return;
      }
      // eslint-disable-next-line consistent-return
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        resolve(decoded.username);
      });
    });

    // eslint-disable-next-line consistent-return
    return { user };
  },
});

server.listen(config.API_PORT).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  API ready at ${url}`);
});
