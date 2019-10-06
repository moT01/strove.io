import React, { memo, useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import DetectBrowser from 'react-detect-browser'
import { isMobile } from 'react-device-detect'

import Modal from './modal'
import Header from './header'
import './layout.css'

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  max-width: 100vw;
  padding-top: 0;
`

const StyledModal = styled(Modal)`
  width: ${props => (props.isMobile ? '70vw' : '30vw')};
`

const Layout = ({ children, browser }) => {
  const [noSupportModalVisible, setNoSupportModalVisible] = useState(false)

  useEffect(() => {
    if (
      browser &&
      browser.name !== 'chrome' &&
      browser.name !== 'firefox' &&
      browser.name !== 'opera' &&
      browser.name !== 'safari'
    ) {
      setNoSupportModalVisible(true)
    }
  }, [browser])

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <StyledModal
            isOpen={noSupportModalVisible}
            onRequestClose={() => setNoSupportModalVisible(false)}
            contentLabel={'Browser not supported'}
            ariaHideApp={false}
            isMobile={isMobile}
            // zIndex={99}
          >
            Your browser might not provide the best Strove.io user experience.
            We recommend using Google Chrome, Mozilla Firefox, Safari or Opera
          </StyledModal>
          <Header siteTitle={data.site.siteMetadata.title} />
          <MainContent>
            {noSupportModalVisible && (
              <div>
                Your browser is not supported. Strove.io currently supports only
                Google Chrome, Mozilla Firefox and Opera
              </div>
            )}
            {children}
          </MainContent>
        </>
      )}
    />
  )
}

export default memo(({ children }) => (
  <DetectBrowser>
    {({ browser }) => <Layout browser={browser}>{children}</Layout>}
  </DetectBrowser>
))
