import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

const link = createHttpLink({ uri: process.env.SILISKY_ENDPOINT })

const cache = new InMemoryCache()

export default new ApolloClient({
  link,
  fetch,
  cache,
})
