import { ApolloClient, split } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import fetch from 'isomorphic-fetch'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import ws from 'ws'

const cache = new InMemoryCache()

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.SILISKY_GRAPHQL_ENDPOINT,
  options: {
    reconnect: true,
  },
  webSocketImpl: ws,
})

const httpLink = new HttpLink({
  uri: process.env.SILISKY_GRAPHQL_ENDPOINT,
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

export default new ApolloClient({
  fetch,
  defaultOptions,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // sendToLoggingService(graphQLErrors)
        graphQLErrors.map(({ message, locations, path, extensions }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
        if (
          graphQLErrors.find(
            ({ extensions }) => extensions.code === 'FORBIDDEN'
          )
        ) {
          // logout()
          console.log('FORBIDDEN!')
        }
      }
      if (networkError) {
        // logoutUser()
        console.log(`[Network error]: ${networkError}`)
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true,
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } })
            return null
          },
        },
      },
      cache,
    }),
    link,
  ]),
  cache,
})
