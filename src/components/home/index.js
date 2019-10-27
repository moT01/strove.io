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

  .ant-btn {
    min-width: 110px;
    height: 40px;
    border-radius: 20px;
    font-size: 16px;
  }

  .ant-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4);
  }
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
