import React, { Suspense } from 'react'

import FullScreenLoader from './fullScreenLoader'

export default WrappedComponent => props => (
  <Suspense
    fallback={
      <FullScreenLoader isFullScreen={false} color="#0072ce" height="15vh" />
    }
  >
    <WrappedComponent {...props} />
  </Suspense>
)
