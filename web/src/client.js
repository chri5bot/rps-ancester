import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const createClient = () => {
    return new ApolloClient({
        link: new HttpLink(),
        cache: new InMemoryCache(),
    })
}