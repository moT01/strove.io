import React, { memo } from 'react'
import styled from 'styled-components/macro'
import CookieConsent from 'react-cookie-consent'
import { Link } from 'react-router-dom'

const StyledCookieConsent = styled(CookieConsent)`
  background: #2b373b;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.c2};
`

const Cookies = () =>
  !window.location.href.includes('/embed') && (
    <StyledCookieConsent buttonText="Understood">
      This website uses cookies to enhance the user experience. You can learn
      more about these cookies and general information about how to change your
      cookie settings by clicking <StyledLink to="/cookies">here</StyledLink>.
    </StyledCookieConsent>
  )

export default memo(Cookies)
