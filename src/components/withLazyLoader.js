import React, { Suspense } from 'react'

import FullScreenLoader from './fullScreenLoader'
import Wrapper from './fullScreenWrapper'

export default WrappedComponent => props => (
  <Suspense
    fallback={
      <Wrapper>
        <FullScreenLoader isFullScreen={false} color="#0072ce" height="15vh" />
      </Wrapper>
    }
  >
    <WrappedComponent {...props} />
  </Suspense>
)
