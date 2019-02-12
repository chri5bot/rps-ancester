import { gql } from 'apollo-server';

export default gql`
  type Token {
    token: String
  }

  input LoginUserInput {
    username: String!
    password: String!
  }

  extend type Mutation {
    loginUser(input: LoginUserInput): Token
  }
`;
