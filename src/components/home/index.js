import React, { memo } from 'react'
import styled from 'styled-components'

import Banner from './banner'
import Features from './features'
import Technologies from './technologies'
import Footer from './footer'
import './static/style'

const StyledWrapper = styled.div`
  width: 100vw;
  color: #697b8c;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Home = () => (
  <StyledWrapper>
    <Banner />
    <Features />
    <Technologies />
    <Footer />
  </StyledWrapper>
)

export default memo(Home)
