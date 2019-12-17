import React, { memo } from 'react'
import { Router } from '@reach/router'

import { PrivateRoute, Editor, Dashboard } from 'components'

const App = () => (
  <>
    <PrivateRoute path="/app/editor" component={Editor} />
    <PrivateRoute path="/app/dashboard" component={Dashboard} />
  </>
)

export default memo(App)
