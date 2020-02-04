import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'

import { Layout } from 'components'
import client from './client'
import rootReducer from './state'

const createStore = reduxCreateStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(createStore)

export default ({ children }) => (
  <Router>
    <ApolloProvider client={client}>
      <Provider store={createStore}>
        <PersistGate loading={null} persistor={persistor}>
          <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
            <Layout>{children}</Layout>
          </StripeProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </Router>
)
