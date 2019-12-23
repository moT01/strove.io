import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Icon } from 'antd'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const StyledAntdIcon = styled(Icon)`
  svg {
    height: ${props => (props.isEditor ? '16px' : '25px')};
    width: ${props => (props.isEditor ? '16px' : '25px')};
  }
  line-height: 1;

  fill: ${({ theme }) => theme.colors.c2};
`

const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.c2};
  font-size: ${props => (props.isEditor ? '16px' : '24px')};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: ${props => (props.isEditor ? '300' : '600')};
  padding: 0 20px;
  cursor: pointer;
  text-decoration: none;
  animation: ${FadeIn} 0.3s ease-out;

  :hover {
    color: ${({ theme }) => theme.colors.c3};
  }
`

const DocsLink = props =>
  props.isMobileOnly ? (
    <StyledA
      href="https://docs.strove.io"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <StyledAntdIcon type="file-text" {...props} />
    </StyledA>
  ) : (
    <StyledA
      href="https://docs.strove.io"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      Docs
    </StyledA>
  )

export default memo(DocsLink)
