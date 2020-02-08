import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'
import { Dashboard } from 'components/svgs'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const StyledDashboardIcon = styled(Dashboard)`
  height: ${props => (props.isEditor ? '16px' : '30px')};
  width: ${props => (props.isEditor ? '16px' : '30px')};
  fill: ${({ theme }) => theme.colors.c2};
`

const LinkText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 16px;
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

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.c2};
  text-decoration: none;
  display: flex;
  font-weight: ${props => (props.isEditor ? '300' : '600')};
`

const LinkWrapper = styled.div`
  font-weight: ${props => (props.isEditor ? '300' : '600')};
  animation: ${FadeIn} 0.3s ease-out;
`

const DashboardLink = props => {
  const token = useSelector(selectors.getToken)

  return (
    <>
      {token && !props.isEmbed && (
        <LinkWrapper {...props}>
          <StyledLink to="/app/dashboard" {...props}>
            {isMobileOnly ? (
              <StyledDashboardIcon {...props} />
            ) : (
              <LinkText {...props}>Dashboard</LinkText>
            )}
          </StyledLink>
        </LinkWrapper>
      )}
    </>
  )
}

export default DashboardLink
