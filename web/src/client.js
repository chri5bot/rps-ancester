import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
// import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { API_URL, WS_URL } from './config'

// eslint-disable-next-line import/prefer-default-export
export const createClient = () => {
  const errorsLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError}`)
    }
  })

  const httpLink = errorsLink.concat(
    new HttpLink({
      uri: API_URL
    })
  )

  const wsLink = errorsLink.concat(
    new WebSocketLink({
      uri: WS_URL,
      options: {
        reconnect: true
      }
    })
  )

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  const link = ApolloLink.from([terminatingLink])

  const authLink = setContext((_, { headers }) => {
    const token = window.sessionStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token || ''
      }
    }
  })

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
  })
}
