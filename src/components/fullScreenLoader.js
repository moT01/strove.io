import React, { useState, memo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Cog } from 'images/svg'
import { Silisky } from 'images/logos'
import { useInterval } from '../hooks'

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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => (props.isFullScreen ? '93vh' : props.height)};
  width: ${props => (props.isFullScreen ? '100vw' : props.height)};
`

const LoaderContainer = styled(LoaderWrapper)`
  width: ${props => (props.isFullScreen ? '25vw' : '100%')};
  top: ${props => props.isFullScreen && '3vh'};
  height: auto;
  animation: ${SpinToWin} 3s linear infinite;
`

const LogoContainer = styled.div`
  width: ${props => (props.isFullScreen ? '20vw' : '4vh')};
  position: absolute;
  animation: ${AntiSpinToWin} 3s linear infinite;
`

const Text = styled.p`
  color: #0072ce;
  font-size: 1rem;
  margin-bottom: 0;
  margin-top: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const StyledSilisky = styled(Silisky)`
  width: '100%';
  height: 'auto';
`

const allMessages = {
  addProject: [
    'Accessing repository',
    'Reserving resources',
    'Cloning repository',
    'Starting virtual machine',
    'Launching editor',
  ],
  continueProject: [],
  getMyProjects: [],
}

const Loader = ({ type = 'getMyProjects', ...props }) => {
  const [counter, setCounter] = useState(0)

  useInterval(
    () => setCounter(counter + 1),
    counter !== allMessages[type].length - 1 ? 1500 : null
  )

  return (
    <LoaderWrapper {...props}>
      <LoaderContainer {...props}>
        <Cog fill={props.color} />
        {props.isFullScreen && (
          <LogoContainer {...props}>
            <StyledSilisky fill="#0072ce" />
          </LogoContainer>
        )}
      </LoaderContainer>
      {props.isFullScreen && <Text>{allMessages[type][counter]}</Text>}
    </LoaderWrapper>
  )
}

export default memo(Loader)
