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

  background: #fff;
  color: #666;
  text-align: center;
  background-color: ${({ latency }) =>
    latency > 10 && latency < 30
      ? 'yellow'
      : latency <= 10
      ? '#39e626'
      : '#ef7a2c'};
`

const LatencyWrapper = styled.div`
  display: flex;
`

const StyledText = styled.div`
  color: white;
  margin-left: 5px;
`

const LatencyIndicator = () => {
  const latency = useSelector(selectors.latency.getLatency)
  console.log('latency', latency)

  return (
    <LatencyWrapper>
      <LatencyCircle latency={latency} />
      {!isMobileOnly && <StyledText>Latency: {latency}ms</StyledText>}
    </LatencyWrapper>
  )
}

export default memo(LatencyIndicator)
