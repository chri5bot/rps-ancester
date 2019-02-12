import { makeExecutableSchema, gql } from 'apollo-server';
import { merge } from 'lodash';

import User from './types/User';

import UserMutations from './mutations/user';


const Root = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const resolvers = merge(
  {},
  UserMutations,
);

const schema = makeExecutableSchema({
  typeDefs: [Root, User],
  resolvers,
});

export default schema;
