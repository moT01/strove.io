import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { isMobileOnly } from 'react-device-detect'

import { Strove } from 'components/svgs'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const LinkWrapper = styled.div`
  font-weight: ${props => (props.isEditor ? '300' : '600')};
  animation: ${FadeIn} 0.3s ease-out;
`

const StyledStroveIcon = styled(Strove)`
  height: ${props => (props.isEditor ? '16px' : '25px')};
  width: ${props => (props.isEditor ? '16px' : '25px')};
  fill: ${({ theme }) => theme.colors.c2};
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.c2};
  text-decoration: none;
  display: flex;
  font-weight: ${props => (props.isEditor ? '300' : '600')};
`

const LinkText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  font-size: ${props => (props.isEditor ? '16px' : '24px')};
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: ${props => (props.isEditor ? '300' : '600')};
  margin: 0;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.c3};
    svg {
      fill: ${({ theme }) => theme.colors.c3};
    }
  }
`

const HomeLink = props => {
  return (
    <>
      {!props.isEmbed && (
        <LinkWrapper {...props}>
          <StyledLink to="/" {...props}>
            {isMobileOnly ? (
              <StyledStroveIcon {...props} />
            ) : (
              <LinkText {...props}>Strove</LinkText>
            )}
          </StyledLink>
        </LinkWrapper>
      )}
    </>
  )
}

export default HomeLink
