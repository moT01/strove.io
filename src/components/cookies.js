import React, { memo } from 'react'
import styled from 'styled-components/macro'

import CookieConsent from 'react-cookie-consent'

const Cookies = () => (
  <CookieConsent
    buttonText="Understood"
    style={{ background: '#2B373B' }}
    buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
  >
    This website uses cookies to enhance the user experience.{' '}
  </CookieConsent>
)

export default Cookies
