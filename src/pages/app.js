import React from 'react'
import { Router } from '@reach/router'
import PrivateRoute from 'components/PrivateRoute'
import Editor from 'components/editor'
import Preview from 'components/preview'
import Dashboard from 'components/dashboard'

const App = () => (
  <Router>
    <PrivateRoute path="/app/editor" component={Editor} />
    <PrivateRoute path="/app/preview" component={Preview} />
    <PrivateRoute path="/app/dashboard" component={Dashboard} />
  </Router>
)

export default App
