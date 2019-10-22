import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components'
import LatencyMonitor from 'latency-monitor'

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
  const [latency, setLatency] = useState(20)

  useEffect(() => {
    const monitor = new LatencyMonitor()
    monitor.on('data', ({ avgMs }) => setLatency(avgMs))
  }, [])

  return (
    <LatencyWrapper>
      <LatencyCircle latency={latency} />
      <StyledText>Latency: {Math.round(latency)}ms</StyledText>
    </LatencyWrapper>
  )
}

export default memo(LatencyIndicator)
