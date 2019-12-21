import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'
import { Dashboard } from 'components/svgs'
import { getWindowPathName } from 'utils'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const StyledDashboardIcon = styled(Dashboard)`
  height: 25px;
  width: 25px;
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
  font-weight: 300;
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
  font-weight: 300;
`

const LinkWrapper = styled.div`
  font-weight: 300;
  animation: ${FadeIn} 0.3s ease-out;
`

const DashboardLink = () => {
  const user = useSelector(selectors.api.getUser)
  const isEmbed = getWindowPathName().includes('embed')

  return (
    <>
      {' '}
      {user && !isEmbed && (
        <LinkWrapper mobile={isMobileOnly}>
          <StyledLink to="/app/dashboard">
            {isMobileOnly ? (
              <StyledDashboardIcon />
            ) : (
              <LinkText>Dashboard</LinkText>
            )}
          </StyledLink>
        </LinkWrapper>
      )}
    </>
  )
}

export default DashboardLink
