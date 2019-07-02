import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import fetch from 'isomorphic-fetch'

const cache = new InMemoryCache()

const request = operation => {
  const token = localStorage.getItem('token')
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'node',
      },
    })
  }
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
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
    new HttpLink({
      uri: process.env.SILISKY_ENDPOINT,
    }),
  ]),
  cache,
})
