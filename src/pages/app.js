import React, { memo } from 'react'
import { Router } from '@reach/router'

import { PrivateRoute, Editor, Dashboard } from 'components'

const App = () => (
  <Router>
    <PrivateRoute path="/app/editor" component={Editor} />
    <PrivateRoute path="/app/dashboard" component={Dashboard} />
  </Router>
)

export default memo(App)
