import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Location } from '@reach/router'
import Login from './login'

const LinkWrapper = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4vh;
  margin: 0 3vw 0 0;
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
  padding-left: 7.5vw;
  padding-right: 7.5vw;
  height: 7vh;
  background: #0072ce;

  @media (max-width: 1366px) {
    height: 5vh;
    padding-left: 2.5vw;
    padding-right: 2.5vw;
  }
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const HeaderComponent = ({ siteTitle, location }) => (
  <HeaderSection>
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
