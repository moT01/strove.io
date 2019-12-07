import React, { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import { Location } from '@reach/router'
import { isMobileOnly } from 'react-device-detect'
import Downshift from 'downshift'
import copyToClipboard from 'copy-to-clipboard'
import { Copy } from 'images/svg'
import { Icon } from 'antd'

import { selectors } from 'state'
import { Strove, Dashboard, Desktop } from 'images/logos'
import LatencyIndicator from './latencyIndicator'
import Login from './login'
import { getWindowPathName } from 'utils'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const Relative = styled.div`
  position: relative;
`

const StyledStroveIcon = styled(Strove)`
  height: 25px;
  fill: ${({ theme }) => theme.colors.c2};
`

const StyledDashboardIcon = styled(Dashboard)`
  height: 25px;
  fill: ${({ theme }) => theme.colors.c2};
`

const StyledDesktopIcon = styled(Desktop)`
  height: 20px;
  fill: ${({ theme }) => theme.colors.c2};
  font-size: 25px;
`

const StyledAntdIcon = styled(Icon)`
  height: 25px;
  fill: ${({ theme }) => theme.colors.c2};
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: ${props => (props.isEmbed ? '20px' : 'auto')};
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  background: ${({ theme }) => theme.colors.c1};
  @media (max-width: 767px) {
    height: 5vh;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  height: 100%;
  height: ${props => (props.mobile ? '5.5vh' : '3vh')};
  align-items: center;

  > div {
    margin: 0 20px;
  }
`

const LinkWrapper = styled.div`
  font-weight: 300;
  animation: ${FadeIn} 0.3s ease-out;
`

const LinkText = styled.h3`
  color: ${({ theme }) => theme.colors.c2};
  font-size: ${props => (props.isEmbed ? '18px' : '1.2rem')};
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 300;
  margin: 0;
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 18px;
  }

  :hover {
    color: ${({ theme }) => theme.colors.c3};
  }
`

const DocsLink = styled.a`
  color: ${({ theme }) => theme.colors.c2};
  font-size: ${props => (props.isEmbed ? '18px' : '1.2rem')};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 300;
  padding: 0 20px;
  cursor: pointer;
  text-decoration: none;
  animation: ${FadeIn} 0.3s ease-out;
  @media (max-width: 767px) {
    height: 5vh;
    font-size: 1.8rem;
  }

  :hover {
    color: ${({ theme }) => theme.colors.c3};
  }
`

const StroveLink = styled(DocsLink)`
  font-size: 14px;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.c2};
  text-decoration: none;
  display: flex;
`

const PreviewLink = styled.a`
  color: ${({ theme }) => theme.colors.c2};
  text-decoration: 'none';
  position: relative;
  display: flex;
  height: ${props => (props.isEmbed ? '18px' : 'auto')};
  padding: 0;
`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${props =>
    props.mobile ? '100%' : props.isEmbed ? '20px' : '2.5vh'};
  margin: 0;
  font-weight: 300;
  animation: ${FadeIn} 0.3s ease-out;
  cursor: pointer;
  @media (max-width: 767px) {
    height: 100%;
  }
`

const LoginButton = styled.button`
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
  cursor: pointer;

  :focus {
    outline: 0;
  }

  span {
    color: ${({ theme }) => theme.colors.c2};
  }

  :hover {
    span {
      color: ${({ theme }) => theme.colors.c3};
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
  box-shadow: 0 1.2vh 1.2vh -1.5vh ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-style: solid;
  background-color: ${({ invert, theme }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
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
  min-width: ${props => (props.isEmbed ? '0' : '150px')};

  svg {
    fill: ${({ theme, invert }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    width: 2.2vh;
    height: auto;
    margin-right: 5px;
  }

  :hover {
    background-color: ${({ theme, invert }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    cursor: pointer;
  }

  :hover svg {
    fill: ${({ theme, invert }) =>
      invert ? theme.colors.c2 : theme.colors.c1};
    cursor: pointer;
  }
`

const Text = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.c2};
  transition: color 0.3s;
  margin: 0;
  font-weight: 300;
  line-height: 1;
  @media (max-width: 767px) {
    font-size: 16px;
  }
  :hover {
    color: ${({ theme }) => theme.colors.c3};
  }
`

const OptionText = styled(Text)`
  color: ${({ theme }) => theme.colors.c1};
  font-weight: 300;
  :hover {
    color: ${({ theme }) => theme.colors.c2};
  }
`

const PortOption = styled(OptionText)`
  font-size: 16px;
`

const DropdownWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  background: none;
  display: flex;
  right: ${props => (props.isEmbed ? '-75px' : '-10px')};
  display: ${({ display }) => (display ? 'visible' : 'hidden')};
`

const CopyWrapper = styled.div`
  cursor: pointer;
  display: flex;

  svg {
    height: 20px;
  }
`

const HeaderComponent = ({ location }) => {
  const [ports, setPorts] = useState([])
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const user = useSelector(selectors.api.getUser)
  const project = useSelector(selectors.api.getCurrentProject)
  const isEmbed = getWindowPathName().includes('embed')

  useEffect(() => {
    if (location.pathname.includes('editor')) {
      if (project?.machineName) {
        setPorts(
          project.additionalPorts.map(portPair => {
            let href
            /* Env's are loaded as strings on production */
            if (process.env.IS_OPENSOURCE === 'true') {
              href = `https://${portPair[1]}.vmopen${
                project.machineName.match(/\d+/g)[0]
              }.silisky.com`
            } else if (process.env.NODE_ENV === 'development') {
              href = `https://${portPair[1]}.vmdev${
                project.machineName.match(/\d+/g)[0]
              }.silisky.com`
            } else {
              href = `https://${portPair[1]}.${project.machineName}.silisky.com`
            }
            return {
              label: `http://0.0.0.0:${portPair[0]}`,
              href,
            }
          })
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.machineName, project?.additionalPorts])

  return (
    <HeaderSection mobile={isMobileOnly} isEmbed={isEmbed}>
      <HeaderWrapper
        isUserInsideEditor={location.pathname === '/app/editor/'}
        mobile={isMobileOnly}
        isEmbed={isEmbed}
      >
        {!isEmbed && (
          <LinkWrapper mobile={isMobileOnly}>
            <StyledLink to="/">
              {isMobileOnly ? (
                <StyledStroveIcon />
              ) : (
                <LinkText>Strove</LinkText>
              )}
            </StyledLink>
          </LinkWrapper>
        )}
        {user && !isEmbed && (
          <LinkWrapper mobile={isMobileOnly}>
            <StyledLink to="/app/dashboard">
              {isMobileOnly ? (
                <StyledDashboardIcon />
              ) : (
                <LinkText>Dashboard</LinkText>
              )}
            </StyledLink>
          </LinkWrapper>
        )}

        {location.pathname.includes('editor') && (
          <Downshift>
            {({ getToggleButtonProps, isOpen }) => (
              <Relative>
                <LoginButton {...getToggleButtonProps({})} isEmbed={isEmbed}>
                  {isMobileOnly ? (
                    <StyledDesktopIcon />
                  ) : (
                    <LinkText isEmbed={isEmbed}>Preview</LinkText>
                  )}
                </LoginButton>
                <DropdownWrapper isEmbed={isEmbed}>
                  {isOpen && (
                    <MenuWrapper invert>
                      {ports.map(item => (
                        <Option
                          invert
                          key={item.value}
                          href={item.href}
                          isEmbed={isEmbed}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PreviewLink
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <PortOption invert>{item.label}</PortOption>
                          </PreviewLink>
                        </Option>
                      ))}
                    </MenuWrapper>
                  )}
                </DropdownWrapper>
              </Relative>
            )}
          </Downshift>
        )}
        {location.pathname === '/app/editor/' && currentProject?.repoLink && (
          <CopyWrapper
            onClick={() =>
              copyToClipboard(
                `https://strove.io/#${currentProject?.repoLink}`.replace(
                  '.git',
                  ''
                ),
                {
                  message:
                    'Press #{key} to copy link to the project for easy sharing',
                }
              )
            }
          >
            {isMobileOnly ? <Copy /> : <LinkText>Copy link</LinkText>}
          </CopyWrapper>
        )}

        {(location.pathname !== '/app/editor/' || !isMobileOnly) &&
        isMobileOnly ? (
          <DocsLink
            href="https://docs.strove.io"
            target="_blank"
            rel="noopener noreferrer"
            isEmbed={isEmbed}
          >
            <StyledAntdIcon type="file-text" />
          </DocsLink>
        ) : (
          <DocsLink
            href="https://docs.strove.io"
            target="_blank"
            rel="noopener noreferrer"
            isEmbed={isEmbed}
          >
            Docs
          </DocsLink>
        )}
      </HeaderWrapper>
      {location.pathname.includes('editor') && <LatencyIndicator />}

      {!location.pathname.includes('embed/editor') && (
        <LoginWrapper>
          {isEmbed && (
            <StroveLink
              href="https://strove.io"
              target="_blank"
              isEmbed={isEmbed}
            >
              Powered by Strove.io
            </StroveLink>
          )}
          <Login isEmbed={isEmbed} />
        </LoginWrapper>
      )}
    </HeaderSection>
  )
}

const Header = props => (
  <Location>
    {({ location }) => <HeaderComponent {...props} location={location} />}
  </Location>
)

export default memo(Header)
