import React, { useEffect, memo } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getWindowSearchParams } from 'utils'
import { Layout, WithTracker } from 'components'
import { actions } from 'state'
import client from './client'
import rootReducer from './state'

const createStore = reduxCreateStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(createStore)

const WithAnalyticsWrapper = memo(({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const searchParams = getWindowSearchParams()
    const feature = searchParams?.get('feature') || ''
    feature && dispatch(actions.feature.displayFeature(feature))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
})

export default ({ children }) => (
  <Router>
    <ApolloProvider client={client}>
      <Provider store={createStore}>
        <PersistGate loading={null} persistor={persistor}>
          <WithAnalyticsWrapper>
            <Layout>{children}</Layout>
          </WithAnalyticsWrapper>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </Router>
)
