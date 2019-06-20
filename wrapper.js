import React from "react"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"
import { Provider } from "react-redux"
import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

import rootReducer from "./src/state"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const client = new ApolloClient({
  uri: process.env.SILISKY_ENDPOINT,
  fetch,
})

const createStore = () =>
  reduxCreateStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
      // other store enhancers if any
    )
  )

// const createStore = () => reduxCreateStore(rootReducer)

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider store={createStore()}>{element}</Provider>
  </ApolloProvider>
)
