import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import fetch from 'isomorphic-fetch'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import ws from 'ws'
import { split } from 'apollo-link'

const cache = new InMemoryCache()

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: process.env.SILISKY_GRAPHQL_ENDPOINT,
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

export default new ApolloClient({
  link,
  cache,
})
