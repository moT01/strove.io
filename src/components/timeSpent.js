import React, { useState, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import { TimeBarContainer, TimeBar, TimeText } from './styled'

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
