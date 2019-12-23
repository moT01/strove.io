import React, { memo, useState } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'

import LatencyIndicator from './latencyIndicator'
import Auth from './auth'
import PreviewDropdown from './previewDropdown'
import DashboardLink from './dashboardLink'
import HomeLink from './homeLink'
import DocsLink from './docsLink'
import CopyLink from './copyLink'
import PoweredByStroveLink from './poweredByStroveLink'
import { getWindowPathName } from 'utils'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: ${props => (props.isEditor ? '20px' : '64px')};
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

const Header = () => {
  const isEmbed = getWindowPathName().includes('embed')
  const isEditor = getWindowPathName().includes('editor')
  const [tabs, setTabs] = useState([
    HomeLink,
    DashboardLink,
    PreviewDropdown,
    CopyLink,
    DocsLink,
  ])
  const locProps = { isEmbed, isEditor, isMobileOnly }

  return (
    <HeaderSection {...locProps}>
      <HeaderWrapper {...locProps}>
        {tabs.map((Component, i) => (
          <Component {...locProps} key={i} />
        ))}
      </HeaderWrapper>
      <LatencyIndicator {...locProps} />

      <PoweredByStroveLink />

      {!isEmbed && (
        <AuthWrapper {...locProps}>
          <Auth {...locProps} />
        </AuthWrapper>
      )}
    </HeaderSection>
  )
}

export default memo(Header)
