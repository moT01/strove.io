import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import { Location } from '@reach/router'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'
import { Stroveio, Dashboard, Desktop } from 'images/logos'
import Login from './login'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${props => (props.mobile ? '100%' : '2.5vh')};
  margin: 0 3vw 0 0;
  font-weight: 200;
  animation: ${FadeIn} 0.3s ease-out;
`

const ZeldaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${props => (props.mobile ? '100%' : '2.5vh')};
  margin: 0;
  font-weight: 200;
  animation: ${FadeIn} 0.3s ease-out;
  @media (max-width: 767px) {
    height: 4vh;
  }
`

const IconWrapper = styled(LinkWrapper)`
  color: #fff;
  animation: ${FadeIn} 0.3s ease-out;
  transition: color 0.3s;

  :hover {
    color: black;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  height: 100%;
`

const LinkText = styled.h3`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 200;
  margin: 0;
  @media (max-width: 767px) {
    height: 5vh;
    font-size: 1.8rem;
  }

  :hover {
    color: black;
  }
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  height: ${props => (props.mobile ? '8vh' : '3vh')};
  background: #0072ce;
  min-height: 1.3rem;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
`

const PreviewLink = styled.a`
  color: '#fff';
  text-decoration: 'none';
`

const HeaderComponent = ({ siteTitle, location }) => {
  const user = useSelector(selectors.api.getUser)
  return (
    <HeaderSection mobile={isMobileOnly}>
      <HeaderWrapper mobile={isMobileOnly}>
        <LinkWrapper mobile={isMobileOnly}>
          <StyledLink to="/">
            {isMobileOnly ? (
              <Stroveio
                style={{ height: '100%', marginTop: '0.6rem' }}
                fill="#ffffff"
              />
            ) : (
              <LinkText>{siteTitle}</LinkText>
            )}
          </StyledLink>
        </LinkWrapper>
        {user && (
          <LinkWrapper mobile={isMobileOnly}>
            <StyledLink to="/app/dashboard">
              {isMobileOnly ? (
                <Dashboard style={{ height: '70%' }} fill="#ffffff" />
              ) : (
                <LinkText>Dashboard</LinkText>
              )}
            </StyledLink>
          </LinkWrapper>
        )}
        {location.pathname === '/app/editor/' && (
          <PreviewLink
            style={{ color: '#fff', textDecoration: 'none' }}
            href={'/app/preview/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper>
              <Desktop style={{ height: '80%' }} fill="#fff"></Desktop>
            </IconWrapper>
          </PreviewLink>
        )}
      </HeaderWrapper>
      <ZeldaWrapper>
        <Login />
      </ZeldaWrapper>
    </HeaderSection>
  )
}

const Header = props => (
  <Location>
    {({ location }) => <HeaderComponent {...props} location={location} />}
  </Location>
)

export default memo(Header)
