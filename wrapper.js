import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

import rootReducer from './src/state'

const httpLink = new HttpLink({
  uri: process.env.SILISKY_ENDPOINT,
})

const terminatingLink = split(({ query }) => {
  const { kind, operation } = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}, httpLink)

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token')

    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` }
    }

    return { headers }
  })

  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('GraphQL error', message)

      if (message === 'UNAUTHENTICATED') {
        // signOut(client)
      }
    })
  }

  if (networkError) {
    console.log('Network error', networkError)

    if (networkError.statusCode === 401) {
      // signOut(client)
    }
  }
})

const link = ApolloLink.from([authLink, errorLink, terminatingLink])

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const client = new ApolloClient({
//   link: createHttpLink({ uri: process.env.SILISKY_ENDPOINT }),
//   cache: new InMemoryCache(),
//   // fetch,
// })

const createStore = reduxCreateStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)

const persistor = persistStore(createStore)

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider store={createStore}>
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  </ApolloProvider>
)
