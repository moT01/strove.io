import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "components/PrivateRoute"
import Editor from "components/editor"
import Preview from "components/preview"

const App = () => (
  <Router>
    <PrivateRoute path="/app/editor" component={Editor} />
    <PrivateRoute path="/app/preview" component={Preview} />
  </Router>
)

export default App
