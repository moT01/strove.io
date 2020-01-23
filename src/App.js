import React from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import { Route } from 'react-router-dom'

import { WithTracker } from 'components'

import Wrapper from './wrapper'
import Routes from './routes'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const Strove = () => (
  <Wrapper>
    <Route component={WithTracker(Routes, {})} />
  </Wrapper>
)

export default Strove
