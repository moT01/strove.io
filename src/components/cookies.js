import React, { memo } from 'react'
import styled from 'styled-components/macro'
import CookieConsent from 'react-cookie-consent'

const StyledCookieConsent = styled(CookieConsent)`
  background: #2b373b;
`

const Cookies = () =>
  !window.location.href.includes('/embed') && (
    <StyledCookieConsent buttonText="Understood">
      This website uses cookies to enhance the user experience.
    </StyledCookieConsent>
  )

export default memo(Cookies)
