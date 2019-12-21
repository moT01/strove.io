import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'
import copyToClipboard from 'copy-to-clipboard'
import { Copy } from 'components/svgs'
import { Icon } from 'antd'

import { selectors } from 'state'
import { Strove } from 'components/svgs'
import LatencyIndicator from '../latencyIndicator'
import Auth from './auth'
import PreviewDropdown from './previewDropdown'
import DashboardLink from './dashboardLink'
import { getWindowPathName } from 'utils'
import Button from 'components/stroveButton'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const StyledStroveIcon = styled(Strove)`
  height: 25px;
  width: 25px;
  fill: ${({ theme }) => theme.colors.c2};
`

const StyledAntdIcon = styled(Icon)`
  svg {
    height: 25px;
    width: 25px;
  }
  line-height: 1;

  fill: ${({ theme }) => theme.colors.c2};
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 20px;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  background: ${({ theme }) => theme.colors.c1};
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

const LinkText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 16px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 300;
  margin: 0;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.c3};
    svg {
      fill: ${({ theme }) => theme.colors.c3};
    }
  }
`

const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 16px;
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

  :hover {
    color: ${({ theme }) => theme.colors.c3};
  }
`

const StroveLink = styled(StyledA)`
  font-size: 16px;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.c2};
  text-decoration: none;
  display: flex;
  font-weight: 300;
`

const AuthWrapper = styled.div`
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

const CopyWrapper = styled.div`
  cursor: pointer;
  display: flex;

  svg {
    height: 20px;
  }
`

const Header = () => {
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const isEmbed = getWindowPathName().includes('embed')
  const [tabs, setTabs] = useState()

  return (
    <HeaderSection mobile={isMobileOnly} isEmbed={isEmbed}>
      <HeaderWrapper
        isUserInsideEditor={window.location.pathname === '/app/editor/'}
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
        <DashboardLink />

        {window.location.pathname.includes('editor') && <PreviewDropdown />}

        {window.location.pathname === '/app/editor/' &&
          currentProject?.repoLink && (
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

        {(window.location.pathname !== '/app/editor/' || !isMobileOnly) &&
        isMobileOnly ? (
          <StyledA
            href="https://docs.strove.io"
            target="_blank"
            rel="noopener noreferrer"
            isEmbed={isEmbed}
          >
            <StyledAntdIcon type="file-text" />
          </StyledA>
        ) : (
          <StyledA
            href="https://docs.strove.io"
            target="_blank"
            rel="noopener noreferrer"
            isEmbed={isEmbed}
          >
            Docs
          </StyledA>
        )}
      </HeaderWrapper>
      {window.location.pathname.includes('editor') && <LatencyIndicator />}

      {isEmbed && (
        <StroveLink href="https://strove.io" target="_blank" isEmbed={isEmbed}>
          Powered by Strove.io
        </StroveLink>
      )}

      {!window.location.pathname.includes('embed/editor') && (
        <AuthWrapper>
          <Auth isEmbed={isEmbed} />
        </AuthWrapper>
      )}
    </HeaderSection>
  )
}

export default memo(Header)
