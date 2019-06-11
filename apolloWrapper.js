import React from "react"
import { ApolloProvider } from "react-apollo"
import client from "./client"

export default ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
