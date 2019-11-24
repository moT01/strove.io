import React, { memo } from 'react'
import styled, { css, keyframes } from 'styled-components'

const Strove = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`

const PoweredByText = styled.div`
  font-size: 18px;
  text-align: center;
  font-style: italic;
  margin-top: 10px;
`

const PoweredBy = () => {
  return (
    <>
      <PoweredByText>Powered by:</PoweredByText>
      <Strove>Strove.io</Strove>
    </>
  )
}

export default memo(PoweredBy)
