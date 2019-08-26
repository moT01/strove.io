import React, { memo } from 'react'
import { Router } from '@reach/router'

import { PrivateRoute, Editor, Preview, Dashboard, Homepage } from 'components'

const App = () => (
  <Router>
    <PrivateRoute path="/app/editor" component={Editor} />
    <PrivateRoute path="/app/preview" component={Preview} />
    <PrivateRoute path="/app/dashboard" component={Dashboard} />
    <PrivateRoute path="/app/homepage" component={Homepage} />
  </Router>
)

export default memo(App)
