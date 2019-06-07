import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import styled from "styled-components"

const LinkWrapper = styled.h3`
  margin: 0 100px 0 0;
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
        {siteTitle}
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
        Editor
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
        Preview
      </Link>
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
