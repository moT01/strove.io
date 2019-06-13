import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

import Login from "./login"

const LinkWrapper = styled.h3`
  margin: 0 100px 0 0;
  display: inline-block;
`

const LinkText = styled.span`
  :hover {
    color: black;
  }
`

const Header = ({ siteTitle }) => (
  <header>
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
      <Login />
    </LinkWrapper>
  </header>
)

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
