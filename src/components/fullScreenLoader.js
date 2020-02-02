import React, { useState, memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { useSelector } from 'react-redux'

import { Cog } from 'components/svgs'
import { useInterval } from 'hooks'
import { selectors } from 'state'

const SpinToWin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`

const SmallLoaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => (props.isFullScreen ? '100vh' : props.height)};
  width: ${props => (props.isFullScreen ? '100vw' : props.height)};
`

const LoaderWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.c2};
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

const FullScreenLoaderWrapper = styled.div`
  animation: ${SpinToWin} 3.5s linear infinite;
  width: 30px;
  height: 30px;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 21px;
  margin-bottom: 0;
  margin-top: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const StyledFullScreenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Text} {
    margin: 0 10px;
  }
`

const Loader = ({ type = 'addProject', ...props }) => {
  const [counter, setCounter] = useState(0)
  const queuePosition = useSelector(selectors.api.getQueuePosition)

  const allMessages = {
    addProject: [
      'Checking permissions',
      'Cloning repository - this can take a moment',
      'Reserving resources',
      'Starting virtual machine',
    ],
    openProject: ['Launching editor'],
    continueProject: ['Reserving resources', 'Starting virtual machine'],
    redirecting: ['Redirecting back to origin site...'],
  }

  useInterval(
    () => setCounter(counter + 1),
    counter !== allMessages[type].length - 1 ? 1500 : null
  )

  if (props.isFullScreen) {
    return (
      <LoaderWrapper {...props}>
        <StyledFullScreenWrapper {...props}>
          <FullScreenLoaderWrapper {...props}>
            <Cog fill={props.color} />
          </FullScreenLoaderWrapper>
          <Text>Loading...</Text>
        </StyledFullScreenWrapper>
        <Text>
          {queuePosition > 1
            ? `Our servers are full. Your position in queue: ${queuePosition}`
            : allMessages[type][counter]}
        </Text>
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
