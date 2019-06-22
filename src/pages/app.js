import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import PrivateRoute from "components/PrivateRoute"
import Editor from "./editor"
import Preview from "./preview"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/editor" component={Editor} />
      <PrivateRoute path="/app/preview" component={Preview} />
    </Router>
  </Layout>
)

export default App
