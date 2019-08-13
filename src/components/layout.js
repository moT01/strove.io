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
                (browser && browser.name === 'opera') ? (
                  <div></div>
                ) : (
                  <div>
                    Your browser is not supported. Strove.io currenty supports
                    only Google Chrome, Mozilla Firefox and Opera
                  </div>
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
