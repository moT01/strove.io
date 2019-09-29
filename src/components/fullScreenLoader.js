import React, { useState, memo } from 'react'
import styled, { keyframes } from 'styled-components'

import { Cog } from 'images/svg'
import { Strove } from 'images/logos'
import { useInterval } from 'hooks'

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

const SmallLoaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => (props.isFullScreen ? '93vh' : props.height)};
  width: ${props => (props.isFullScreen ? '100vw' : props.height)};
`

const LoaderWrapper = styled.div`
  top: 0;
  position: fixed;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => (props.isFullScreen ? '100vh' : props.height)};
  width: ${props => (props.isFullScreen ? '100vw' : props.height)};
`

const LoaderContainer = styled(SmallLoaderWrapper)`
  width: ${props => (props.isFullScreen ? '15vw' : '100%')};
  top: ${props => props.isFullScreen && '3vh'};
  height: auto;
  animation: ${SpinToWin} 3.5s linear infinite;
`

const LogoContainer = styled.div`
  position: absolute;
  animation: ${AntiSpinToWin} 3.5s linear infinite;
`

const Text = styled.p`
  color: #0072ce;
  font-size: 21px;
  margin-bottom: 0;
  margin-top: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const StyledLogo = styled(Strove)`
  width: 5vw;
  height: 5vw;
`

const allMessages = {
  addProject: ['Accessing repository', 'Cloning repository'],
  continueProject: [
    'Reserving resources',
    'Starting virtual machine',
    'Launching editor',
  ],
}

const Loader = ({ type = 'addProject', ...props }) => {
  const [counter, setCounter] = useState(0)

  useInterval(
    () => setCounter(counter + 1),
    counter !== allMessages[type].length - 1 ? 1500 : null
  )

  if (props.isFullScreen) {
    return (
      <LoaderWrapper {...props}>
        <LoaderContainer {...props}>
          <Cog fill={props.color} />
          <LogoContainer {...props}>
            <StyledLogo fill="#0072ce" />
          </LogoContainer>
        </LoaderContainer>
        <Text>{allMessages[type][counter]}</Text>
      </LoaderWrapper>
    )
  }

  return (
    <SmallLoaderWrapper {...props}>
      <LoaderContainer {...props}>
        <Cog fill={props.color} />
      </LoaderContainer>
      {props.isFullScreen && <Text>{allMessages[type][counter]}</Text>}
    </SmallLoaderWrapper>
  )
}

export default memo(Loader)
