import React, { Suspense, lazy } from 'react'

import FullScreenLoader from './fullScreenLoader'

const LazyLoader = ({ children }) => (
  <Suspense
    fallback={
      <FullScreenLoader isFullScreen={false} color="#0072ce" height="15vh" />
    }
  >
    {children}
  </Suspense>
)

export default lazy(WrappedComponent => props => (
  <LazyLoader>
    <WrappedComponent {...props} />
  </LazyLoader>
))
