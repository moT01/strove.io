import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import { Location } from '@reach/router'
import { isMobileOnly } from 'react-device-detect'
import Downshift from 'downshift'

import { selectors } from 'state'
import { Strove, Dashboard, Desktop } from 'images/logos'
import Login from './login'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${props => (props.mobile ? '100%' : '2.5vh')};
  margin: 0 3vw 0 0;
  font-weight: 300;
  animation: ${FadeIn} 0.3s ease-out;
`

const ZeldaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${props => (props.mobile ? '100%' : '2.5vh')};
  margin: 0;
  font-weight: 300;
  animation: ${FadeIn} 0.3s ease-out;
  cursor: pointer;
  @media (max-width: 767px) {
    height: 4vh;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  height: 100%;
`

const LinkText = styled.h3`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 300;
  margin: 0;
  @media (max-width: 767px) {
    height: 5vh;
    font-size: 1.8rem;
  }

  :hover {
    color: black;
  }
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  height: ${props => (props.mobile ? '8vh' : '3.2vh')};
  background: #0072ce;
  min-height: 1.3rem;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
`

const PreviewLink = styled.a`
  color: '#fff';
  text-decoration: 'none';
  position: relative;
  display: flex;
`

const LoginButton = styled.button`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: 'relative';
  background: none;
  border: none;
  text-decoration: none;
  font-weight: 300;
  line-height: 1;
  padding: 0;
  height: 3vh;
  cursor: pointer;

  :focus {
    outline: 0;
  }

  span {
    color: white;
  }

  :hover {
    color: black;

    span {
      color: black;
    }
  }

  > {
    vertical-align: bottom;
  }
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: auto;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  border-radius: 5px;
  border-width: 1px;
  border-color: #0072ce;
  border-style: solid;
  background-color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
  z-index: 3;
  position: relative;
`

const Option = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.2vh`)};
  width: auto;
  height: 32px;
  font-size: 1.2rem;
  border-bottom-left-radius: ${props => props.isLast && '3px'};
  border-bottom-right-radius: ${props => props.isLast && '3px'};
  z-index: 4;
  text-decoration: none;
  font-weight: 300;
  min-width: 150px;

  svg {
    fill: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    width: 2.2vh;
    height: auto;
    margin-right: 5px;
  }

  :hover {
    background-color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    cursor: pointer;
  }

  :hover svg {
    fill: ${props => (props.invert ? '#ffffff' : '#0072ce')};
    cursor: pointer;
  }
`

const Text = styled.h3`
  font-size: 1.2rem;
  color: white;
  transition: color 0.3s;
  margin: 0;
  font-weight: 300;
  line-height: 1;
  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
  :hover {
    color: black;
  }
`

const OptionText = styled(Text)`
  color: #0072ce;
  font-weight: 300;
  :hover {
    color: #ffffff;
  }
`

const DropdownWrapper = styled.div`
  position: absolute;
  background: none;
  right: 1.5vw;
  display: flex;
  right: -10px;
  display: ${({ display }) => (display ? 'visible' : 'hidden')};
`

const HeaderComponent = ({ siteTitle, location }) => {
  const ports = [
    {
      label: 'PORT 3000',
      href: `https://20402.vm1.silisky.com`,
    },
    {
      label: 'PORT 8000',
      href: `https://20129.vm1.silisky.com`,
    },
  ]

  const user = useSelector(selectors.api.getUser)
  return (
    <HeaderSection mobile={isMobileOnly}>
      <HeaderWrapper mobile={isMobileOnly}>
        <LinkWrapper mobile={isMobileOnly}>
          <StyledLink to="/">
            {isMobileOnly ? (
              <Strove
                style={{ height: '100%', marginTop: '0.6rem' }}
                fill="#ffffff"
              />
            ) : (
              <LinkText>{siteTitle}</LinkText>
            )}
          </StyledLink>
        </LinkWrapper>
        {user && (
          <LinkWrapper mobile={isMobileOnly}>
            <StyledLink to="/app/dashboard">
              {isMobileOnly ? (
                <Dashboard style={{ height: '70%' }} fill="#ffffff" />
              ) : (
                <LinkText>Dashboard</LinkText>
              )}
            </StyledLink>
          </LinkWrapper>
        )}
        {location.pathname === '/app/editor/' && (
          <Downshift>
            {({ getToggleButtonProps, isOpen }) => (
              <span style={{ position: 'relative' }}>
                <LoginButton {...getToggleButtonProps({})}>
                  <Desktop style={{ height: '80%' }} fill="#fff" />
                </LoginButton>
                <DropdownWrapper>
                  {isOpen && (
                    <MenuWrapper invert>
                      {ports.map(item => (
                        <Option invert key={item.value} href={item.href}>
                          <PreviewLink
                            style={{ color: '#fff', textDecoration: 'none' }}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Desktop
                              style={{ display: 'inline-block' }}
                              fill="#fff"
                            ></Desktop>
                            <OptionText invert>{item.label}</OptionText>
                          </PreviewLink>
                        </Option>
                      ))}
                    </MenuWrapper>
                  )}
                </DropdownWrapper>
              </span>
            )}
          </Downshift>
        )}
      </HeaderWrapper>
      <ZeldaWrapper>
        <Login />
      </ZeldaWrapper>
    </HeaderSection>
  )
}

const Header = props => (
  <Location>
    {({ location }) => <HeaderComponent {...props} location={location} />}
  </Location>
)

export default memo(Header)
