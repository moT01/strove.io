import React, { useEffect, memo } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { getWindowSearchParams } from 'utils'
import { actions } from 'state'
import client from './client'
import rootReducer from './src/state'

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

    const displayEmbedded = searchParams?.get('embed')
    displayEmbedded &&
      dispatch(actions.displayEmbedded.displayEmbedded(feature))
  }, [])

  return children
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider store={createStore}>
      <PersistGate loading={null} persistor={persistor}>
        <WithAnalyticsWrapper>{element}</WithAnalyticsWrapper>
      </PersistGate>
    </Provider>
  </ApolloProvider>
)
