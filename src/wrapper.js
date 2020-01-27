import React, { memo } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'

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
          <Layout>{children}</Layout>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </Router>
)
