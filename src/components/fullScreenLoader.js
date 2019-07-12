import React from 'react'
import styled, { keyframes } from 'styled-components'
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
  height: ${props => (props.isFullScreen ? '100vh' : props.height)};
  width: ${props => (props.isFullScreen ? '100vw' : props.height)};
`

const LoaderContainer = styled(LoaderWrapper)`
  width: ${props => (props.isFullScreen ? '25vw' : '100%')};
  height: auto;
  animation: ${SpinToWin} 3s linear infinite;
`

const LogoContainer = styled.div`
  width: ${props => (props.isFullScreen ? '20vw' : '4vh')};
  position: absolute;
  z-index: 4;
  animation: ${AntiSpinToWin} 3s linear infinite;
`

const Loader = props => {
  return (
    <LoaderWrapper {...props}>
      <LoaderContainer {...props}>
        <Cog fill={props.color} />
        {props.isFullScreen && (
          <LogoContainer {...props}>
            <Silisky style={{ width: '100%', height: 'auto' }} />
          </LogoContainer>
        )}
      </LoaderContainer>
    </LoaderWrapper>
  )
}

export default Loader
