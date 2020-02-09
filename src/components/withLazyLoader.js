import React, { Suspense } from 'react'
import styled from 'styled-components'

import FullScreenLoader from './fullScreenLoader'

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

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
