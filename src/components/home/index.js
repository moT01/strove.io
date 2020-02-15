import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { useAnalytics } from 'hooks'
import { enterpriseFeatures, devFeatures } from 'consts'

import Banner from './banner'
import Features from './features'
import Technologies from './technologies'
import ForEnterprise from './forEnterprise'
import Footer from '../footer'

const StyledWrapper = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.colors.c13};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Home = () => {
  const ref = useAnalytics()

  return (
    <StyledWrapper ref={ref}>
      <Banner />
      <ForEnterprise />
      <Features features={enterpriseFeatures} />
      <ForEnterprise />
      <Features features={devFeatures} />
      <Technologies />
      <Footer />
    </StyledWrapper>
  )
}

export default memo(Home)
