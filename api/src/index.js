

import { createServer } from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config';
import schema from './schema';

dotenv.config();

const PORT = config.API_PORT || 4000;

const app = express();
app.use(cors());

const apolloServer = new ApolloServer({
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
});

apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
});
