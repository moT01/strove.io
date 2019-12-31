import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectors } from 'state'

const lowerLatencyThreshold = 20
const higherLatencyThreshold = 50

const LatencyCircle = styled.div`
  border-radius: 50%;
  width: 12px;
  height: 12px;
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
  white-space: nowrap;
  overflow: hidden;
`

const StyledText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 14px;
  margin-left: 5px;
  font-weight: 300;
  text-overflow: ellipsis;
`

const LatencyIndicator = props => {
  const latency = useSelector(selectors.latency.getLatency)

  return (
    <>
      {props.isEditor && (
        <LatencyWrapper>
          <LatencyCircle latency={latency} {...props} />
          {!isMobileOnly && (
            <StyledText {...props}>
              Latency: {latency}ms{' '}
              {latency > lowerLatencyThreshold &&
                '- Syntax highlight might take a moment to load'}
            </StyledText>
          )}
        </LatencyWrapper>
      )}
    </>
  )
}

export default memo(LatencyIndicator)
