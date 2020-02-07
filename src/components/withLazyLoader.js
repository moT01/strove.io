import React, { Suspense } from 'react'

import FullScreenLoader from './fullScreenLoader'

export default ({ children }) => (
  <Suspense
    fallback={
      <FullScreenLoader isFullScreen={false} color="#0072ce" height="15vh" />
    }
  >
    {children}
  </Suspense>
)
