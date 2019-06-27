import { Link } from 'gatsby'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Location } from '@reach/router'
import Login from './login'
import { Icon } from 'antd'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const LinkWrapper = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4vh;
  margin: 0 3vw 0 0;
`

const IconWrapper = styled(LinkWrapper)`
  color: #fff;
  animation: ${FadeIn} 0.3s ease-out;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 3vw 0 0;
`

const ZeldaWrapper = styled(LinkWrapper)`
  margin: 0;
`

const LinkText = styled.span`
  font-size: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  :hover {
    color: black;
  }
  @media (max-width: 1366px) {
    font-size: 2.5vh;
  }
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  height: 7vh;
  background: #0072ce;

  @media (max-width: 1366px) {
    height: 5vh;
  }
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const HeaderComponent = ({ siteTitle, location }) => (
  <HeaderSection>
    {console.log('TCL: location', location)}
    <HeaderWrapper>
      <LinkWrapper>
        <StyledLink to="/">
          <LinkText>{siteTitle}</LinkText>
        </StyledLink>
      </LinkWrapper>
      <LinkWrapper>
        <StyledLink to="/app/dashboard">
          <LinkText>Dashboard</LinkText>
        </StyledLink>
      </LinkWrapper>
      <LinkWrapper>
        <StyledLink to="/pricing">
          <LinkText>Pricing</LinkText>
        </StyledLink>
      </LinkWrapper>
      {location.pathname === '/app/editor/' && (
        <a
          style={{ color: '#fff', textDecoration: 'none' }}
          href="localhost:8000/app/preview/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* // openInNewTab(url) {
        //   var win = window.open(url, '_blank');
        //   win.focus();
        // } */}
          <IconWrapper
          // onClick={() => window.open('localhost:8000/app/preview/', '_blank')}
          >
            <Icon type="desktop" style={{ fontSize: '3vh' }}></Icon>
          </IconWrapper>
        </a>
      )}
    </HeaderWrapper>
    <ZeldaWrapper>
      <Login />
    </ZeldaWrapper>
  </HeaderSection>
)

const Header = props => (
  <Location>
    {({ location }) => <HeaderComponent {...props} location={location} />}
  </Location>
)

export default Header
