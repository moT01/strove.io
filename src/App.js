import React from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import { Route } from 'react-router-dom'

import { PrivateRoute, Dashboard, WithTracker } from 'components'

import Wrapper from './wrapper'
import Routes from './routes'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const Strove = () => (
  <Wrapper>
    <Routes />
  </Wrapper>
)

export default Strove
