import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// eslint-disable-next-line import/prefer-default-export
export const createClient = () => {
  return new ApolloClient({
    link: new HttpLink(),
    cache: new InMemoryCache()
  })
}
