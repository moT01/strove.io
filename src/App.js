import React from 'react'
import { Route } from 'react-router-dom'

import { WithTracker } from 'components'

import Wrapper from './wrapper'
import Routes from './routes'

const Strove = () => (
  <Wrapper>
    <Route component={WithTracker(Routes, {})} />
  </Wrapper>
)

export default Strove
