import React, { memo } from 'react'
import { Router } from '@reach/router'

import { PrivateRoute, Editor, Dashboard } from 'components'

/* Todo: Add embed only loading screen */
const Embed = () => (
  <Router>
    <Dashboard path="/embed" />
    <PrivateRoute path="/embed/editor" component={Editor} />
  </Router>
)

export default memo(Embed)
