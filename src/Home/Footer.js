import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 16vh;
  background-color: #0072ce;
`

const ColumnWrapper = styled(FooterWrapper)`
  justify-content: space-around;
  width: 80%;
  height: auto;
  align-items: flex-start;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const StyledLink = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  color: white;
`

const StyledAnchor = styled.a`
  font-size: 1rem;
  text-decoration: none;
  color: white;
`

const Footer = () => {
  return (
    <FooterWrapper>
      <ColumnWrapper>
        <Column>
          <StyledLink to="/blog">Blog</StyledLink>
          <StyledLink to="/cookies">Github</StyledLink>
          <StyledLink to="/cookies">Twitter</StyledLink>
          <StyledAnchor href="mailto:contact@codengo.net?subject=Silisky demo&body=We'd love to get to know how we can help!%0D%0A%0D%0AWhen is it a good time to schedule a call?">
            Contact us
          </StyledAnchor>
        </Column>
        <Column>
          <StyledLink to="/documentation">Documentation</StyledLink>
          <StyledLink to="/pricing">Pricing</StyledLink>
        </Column>
        <Column>
          <StyledLink to="/faq">FAQ</StyledLink>
          <StyledLink to="/cookies">Cookies</StyledLink>
          <StyledLink to="/privacyPolicy">Privacy Policy</StyledLink>
          <StyledLink to="/termsandConditions">Terms and conditions</StyledLink>
        </Column>
      </ColumnWrapper>
    </FooterWrapper>
  )
}

export default Footer
