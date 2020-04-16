import React, { useState, useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'
import { persistStore } from 'redux-persist'

import { Layout } from 'components'
import client from './client'
import store from './store'

export let persistor

export default ({ children }) => {
  const [isRehydrating, setIsRehydrating] = useState(true)
  useEffect(() => {
    persistor = persistStore(store, {}, () => {
      setIsRehydrating(false)
    })
  }, [])

  if (isRehydrating) {
    return <div></div>
  }
  return (
    <Router>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
              <Layout>{children}</Layout>
            </StripeProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </Router>
  )
}
