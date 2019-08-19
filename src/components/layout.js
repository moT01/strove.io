import React, { memo, useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import DetectBrowser from 'react-detect-browser'

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

const Layout = ({ children, browser }) => {
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (
      (browser && browser.name === 'chrome') ||
      (browser && browser.name === 'firefox') ||
      (browser && browser.name === 'opera') ||
      (browser && browser.name === 'safari')
    ) {
      return null
    } else {
      setModalVisible(true)
    }
  }, [])

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
          <Header siteTitle={data.site.siteMetadata.title} />
          <MainContent>{children}</MainContent>
        </>
      )}
    />
  )
}

// Your browser might not provide the best Strove.io user
//                     experience. We recommend using Google Chrome, Mozilla
//                     Firefox, Safari or Opera

const LayoutWithBrowser = () => (
  <DetectBrowser>{({ browser }) => <Layout browser={browser} />}</DetectBrowser>
)

export default memo(LayoutWithBrowser)
