
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
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

const app = express();
app.use(cors());
app.set('PORT', config.API_PORT || 4000);
server.applyMiddleware({ app });

// eslint-disable-next-line no-console
app.listen(app.get('PORT'), () => console.log(`🚀 Server ready at http://localhost:${app.get('PORT')}`));
