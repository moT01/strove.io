import React, { useState, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { selectors } from 'state'

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

  if (
    organization.owner.id === user.id &&
    organization.subscriptionStatus === 'inactive' &&
    user?.timeSpent >= 65800
  ) {
    return (
      <div>
        <TimeBarContainer>
          <TimeBar time={user.timeSpent} />
        </TimeBarContainer>
        <TimeText>
          Time spent in editor: {time.hours}h {time.minutes}m {time.seconds}s /
          20h
        </TimeText>
      </div>
    )
  }
  return null
}

export default memo(TimeSpent)
