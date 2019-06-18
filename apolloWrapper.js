import React from "react"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"
import { Provider } from "react-redux"
import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "./src/state"

const client = new ApolloClient({
  uri: process.env.SILISKY_ENDPOINT,
  fetch,
})

const createStore = () =>
  reduxCreateStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware()
      // other store enhancers if any
    )
  )

// const createStore = () => reduxCreateStore(rootReducer)

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider store={createStore()}>{element}</Provider>
  </ApolloProvider>
)
