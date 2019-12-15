import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import fetch from 'isomorphic-fetch'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

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

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: process.env.SILISKY_WEBSOCKET_ENDPOINT,
      options: {
        reconnect: true,
      },
    })
  : null

const httpLink = new HttpLink({
  uri: process.env.SILISKY_GRAPHQL_ENDPOINT,
})

const link = process.browser
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )
  : httpLink

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
          console.log('FORBIDDEN!')
        }
      }
      if (networkError) {
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
