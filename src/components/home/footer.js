import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Github } from 'components/svgs'

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 18vh;
  background-color: ${({ theme }) => theme.colors.c1};
  @media (max-width: 767px) {
    height: auto;
    padding: 10px 0 10px 0;
  }
`

const ColumnWrapper = styled(FooterWrapper)`
  justify-content: space-around;
  width: 80%;
  height: auto;
  align-items: flex-start;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const ColumnTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.c2};
  margin: 5px 0 5px 0;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.c2};
`

const LinkText = styled.h3`
  font-size: 0.9rem;
  font-weight: 200;
  margin: 0 0 6px 0;
  cursor: pointer;
`

const StyledAnchor = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.c2};
  display: flex;

  svg {
    width: 0.9rem;
    height: 0.9rem;
    margin-right: 5px;
  }
`

const StyledGithub = styled(Github)`
  fill: #fff;
`

const Footer = () => {
  return (
    <FooterWrapper>
      <ColumnWrapper>
        <Column>
          <ColumnTitle>Social</ColumnTitle>
          <StyledAnchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/stroveio/strove.io-client"
          >
            <StyledGithub />
            <LinkText>Source code</LinkText>
          </StyledAnchor>
          <StyledAnchor href="mailto:contact@strove.io?subject=Strove demo&body=We'd love to get to know how we can help!">
            <LinkText>Contact us</LinkText>
          </StyledAnchor>
        </Column>
        <Column>
          <ColumnTitle>About</ColumnTitle>
          <StyledLink to="/pricing">
            <LinkText>Pricing</LinkText>
          </StyledLink>
          <StyledLink to="/faq">
            <LinkText>FAQ</LinkText>
          </StyledLink>
        </Column>
        <Column>
          <ColumnTitle>Terms of use</ColumnTitle>
          <StyledLink to="/cookies">
            <LinkText>Cookies</LinkText>
          </StyledLink>
          <StyledLink to="/privacyPolicy">
            <LinkText>Privacy Policy</LinkText>
          </StyledLink>
          <StyledLink to="/termsAndConditions">
            <LinkText>Terms and conditions</LinkText>
          </StyledLink>
        </Column>
      </ColumnWrapper>
    </FooterWrapper>
  )
}

export default Footer
