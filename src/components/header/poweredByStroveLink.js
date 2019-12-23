import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 300;
  padding: 0 20px;
  cursor: pointer;
  text-decoration: none;
  animation: ${FadeIn} 0.3s ease-out;

  :hover {
    color: ${({ theme }) => theme.colors.c3};
  }
`

const PoweredByStroveLink = props => {
  return (
    props.isEmbed && (
      <StyledA href="https://strove.io" target="_blank">
        Powered by Strove.io
      </StyledA>
    )
  )
}

export default memo(PoweredByStroveLink)
