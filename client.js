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
import { Link } from 'gatsby'
import window from 'utils/window'

// const WebSocket = require('isomorphic-ws')

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

const httpLink = new HttpLink({
  uri: process.env.SILISKY_GRAPHQL_ENDPOINT,
})

let link
// https://stackoverflow.com/questions/20060320/what-is-the-best-way-to-detect-websocket-support-using-javascript
if (window && ('WebSocket' in window || 'MozWebSocket' in window)) {
  link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    new WebSocketLink({
      uri: process.env.SILISKY_GRAPHQL_ENDPOINT,
      options: {
        reconnect: true,
      },
    }),
    httpLink
  )
} else {
  link = httpLink
}

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
