import React, { useState, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { selectors } from 'state'
import { useInterval } from 'hooks'

export const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin-left: 10px;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const TimeBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 15px;
  border: 1px solid #0072ce;
  border-radius: 2px;
  overflow: hidden;
`

export const TimeBar = styled.div`
  height: 100%;
  width: ${({ time }) => (time / 72000000) * 100}%;
  background-color: #0072ce;
`

export const TimeText = styled(Text)`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 12px;
  margin: 0;
`

const TimeSpent = ({ organization }) => {
  const user = useSelector(selectors.api.getUser)
  const [additionalTimeSpent, setAdditionalTimeSpent] = useState(0)
  const oneMinute = 60000
  useInterval(
    () => setAdditionalTimeSpent(additionalTimeSpent + oneMinute),
    oneMinute
  )

  useEffect(() => {
    setAdditionalTimeSpent(0)
  }, [organization])

  const timeSpent = (user?.timeSpent || 0) + additionalTimeSpent
  const seconds = Math.floor((timeSpent / 1000) % 60)
  const minutes = Math.floor((timeSpent / (1000 * 60)) % 60)
  const hours = Math.floor((timeSpent / (1000 * 60 * 60)) % 24)

  if (
    organization.owner.id === user.id &&
    organization.subscriptionStatus === 'inactive' &&
    timeSpent >= 65800
  ) {
    return (
      <div>
        <TimeBarContainer>
          <TimeBar time={user.timeSpent} />
        </TimeBarContainer>
        <TimeText>
          Time spent in editor: {hours}h {minutes}m {seconds}s / 20h
        </TimeText>
      </div>
    )
  }
  return null
}

export default memo(TimeSpent)
