import React from 'react'
import styled, { keyframes } from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Cog } from '../images/svg'
import { Silisky } from '../images/logos'

const SpinToWin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`

const AntiSpinToWin = keyframes`
  0% {
    transform: rotate(360deg)
  }
  100% {
    transform: rotate(0deg)
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95vh;
  width: 100vw;
`

const LoaderContainer = styled(LoaderWrapper)`
  width: 25vw;
  height: auto;
  animation: ${SpinToWin} 3s linear infinite;
`

const LogoContainer = styled.div`
  width: 20vw;
  position: absolute;
  z-index: 4;
  animation: ${AntiSpinToWin} 3s linear infinite;
`

const Loader = props => (
  <LoaderWrapper>
    <LoaderContainer>
      <Cog />
      <LogoContainer>
        <Silisky style={{ width: '100%', height: 'auto' }} />
      </LogoContainer>
    </LoaderContainer>
  </LoaderWrapper>
)

export default Loader
