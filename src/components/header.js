import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

import Login from "./login"

const LinkWrapper = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4vh;
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

const Header = ({ siteTitle }) => (
  <HeaderSection>
    <LinkWrapper>
      <LinkWrapper>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <LinkText>{siteTitle}</LinkText>
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link
          to="/editor"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <LinkText>Editor</LinkText>
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link
          to="/preview"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <LinkText>Preview</LinkText>
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link
          to="/pricing"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <LinkText>Pricing</LinkText>
        </Link>
      </LinkWrapper>
    </LinkWrapper>
    <ZeldaWrapper>
      <Login />
    </ZeldaWrapper>
  </HeaderSection>
)

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
