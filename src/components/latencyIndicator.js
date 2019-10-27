import React, { memo } from 'react'
import styled from 'styled-components'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectors } from 'state'

const LatencyCircle = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 8px;

  background: ${({ theme }) => theme.colors.c2};
  text-align: center;
  background-color: ${({ latency, theme }) =>
    latency > 10 && latency < 30
      ? 'yellow'
      : latency <= 10
      ? theme.colors.c6
      : theme.colors.c7};
`

const LatencyWrapper = styled.div`
  display: flex;
`

const StyledText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  margin-left: 5px;
  text-overflow: ellipsis;
`

const LatencyIndicator = () => {
  const latency = useSelector(selectors.latency.getLatency)

  return (
    <LatencyWrapper>
      <LatencyCircle latency={latency} />
      {!isMobileOnly && (
        <StyledText>
          Latency: {latency}ms{' '}
          {latency > 10 && '- Syntax highlight might take a moment to load'}
        </StyledText>
      )}
    </LatencyWrapper>
  )
}

export default memo(LatencyIndicator)
