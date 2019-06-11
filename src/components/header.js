import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import styled from "styled-components"

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI

const LinkWrapper = styled.h3`
  margin: 0 100px 0 0;
  display: inline-block;
`

const LoginButton = styled.a`
  color: white;
  text-decoration: none;

  :hover {
    color: black;
  }
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
      <LoginButton
        href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&redirect_uri=${REDIRECT_URI}`}
      >
        <LinkText>Login</LinkText>
      </LoginButton>
    </LinkWrapper>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
