

import { createServer } from 'http';
import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config';

// eslint-disable-next-line import/no-cycle
import schema from './schema';

// eslint-disable-next-line import/prefer-default-export
export const pubsub = new PubSub();

dotenv.config();

const PORT = config.API_PORT || 4000;

const app = express();
app.use(cors());

const server = new ApolloServer({
  schema,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    }
    const token = req.headers.authorization;

    if (!token) {
      // eslint-disable-next-line consistent-return
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
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
});

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  // eslint-disable-next-line no-console
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
