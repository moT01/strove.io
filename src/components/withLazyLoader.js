import React, { Suspense } from 'react'

import FullScreenLoader from './fullScreenLoader'
import FullScreenWrapper from './fullScreenWrapper'

export default WrappedComponent => props => (
  <Suspense
    fallback={
      <FullScreenWrapper>
        <FullScreenLoader isFullScreen={false} color="#0072ce" height="15vh" />
      </FullScreenWrapper>
    }
  >
    <WrappedComponent {...props} />
  </Suspense>
)
