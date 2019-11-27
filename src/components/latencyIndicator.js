import React, { memo } from 'react'
import styled from 'styled-components'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import { getWindowPathName } from 'utils'

const LatencyCircle = styled.div`
  border-radius: 50%;
  width: ${props => (props.isEmbed ? '16px' : '20px')};
  height: ${props => (props.isEmbed ? '16px' : '20px')};
  padding: 8px;
  margin: auto;

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
  font-size: ${props => (props.isEmbed ? '16px' : '1.2rem')};
  margin-left: 5px;
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
          {latency > 10 && '- Syntax highlight might take a moment to load'}
        </StyledText>
      )}
    </LatencyWrapper>
  )
}

export default memo(LatencyIndicator)
