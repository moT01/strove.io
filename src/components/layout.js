import React, { memo } from 'react'
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

const Layout = ({ children }) => {
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
          <MainContent>
            <DetectBrowser>
              {({ browser }) =>
                (browser && browser.name === 'chrome') ||
                (browser && browser.name === 'firefox') ||
                (browser && browser.name === 'opera') ||
                (browser && browser.name === 'safari') ? null : (
                  <>
                    Your browser might not provide the best Strove.io user
                    experience. We recommend using Google Chrome, Mozilla
                    Firefox, Safari or Opera
                  </>
                )
              }
            </DetectBrowser>
            {children}
          </MainContent>
        </>
      )}
    />
  )
}

export default memo(Layout)
