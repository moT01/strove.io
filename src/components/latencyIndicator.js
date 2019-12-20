import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import { getWindowPathName } from 'utils'

const lowerLatencyThreshold = 20
const higherLatencyThreshold = 50

const LatencyCircle = styled.div`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  padding: 8px;
  margin: auto;

  background: ${({ theme }) => theme.colors.c2};
  text-align: center;
  background-color: ${({ latency, theme }) =>
    latency > lowerLatencyThreshold && latency < higherLatencyThreshold
      ? 'yellow'
      : latency <= lowerLatencyThreshold
      ? theme.colors.c6
      : theme.colors.c7};
`

const LatencyWrapper = styled.div`
  display: flex;
`

const StyledText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 16px;
  margin-left: 5px;
  font-weight: 600;
  text-overflow: ellipsis;
`

const LatencyIndicator = () => {
  const latency = useSelector(selectors.latency.getLatency)
  const isEmbed = getWindowPathName().includes('embed')

  return (
    <LatencyWrapper>
      <LatencyCircle latency={latency} isEmbed={isEmbed} />
      {!isMobileOnly && (
        <StyledText isEmbed={isEmbed}>
          Latency: {latency}ms{' '}
          {latency > lowerLatencyThreshold &&
            '- Syntax highlight might take a moment to load'}
        </StyledText>
      )}
    </LatencyWrapper>
  )
}

export default memo(LatencyIndicator)
