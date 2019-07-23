import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import Loader from 'components/fullScreenLoader.js'
import Header from './header'
import { selectors } from 'state'
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
  const isLoading = useSelector(selectors.api.getLoading('myProjects'))

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
          {isLoading ? (
            <Loader isFullScreen={true} color="#0072ce" />
          ) : (
            <MainContent>{children}</MainContent>
          )}
        </>
      )}
    />
  )
}

export default Layout
