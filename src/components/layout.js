import React, { useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { navigate } from '@reach/router'

import * as C from 'state/currentProject/constants'
import Loader from 'components/fullScreenLoader.js'
import Header from './header'
import { selectors } from 'state'
import { createProject } from 'utils'
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

const LayoutComponent = ({ children, location }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const isLoading = useSelector(selectors.getLoading('myProjects'))

  const setCurrentProject = ({ id, editorPort, previewPort, machineId }) => {
    dispatch({
      type: C.SELECT_CURRENT_PROJECT,
      payload: { id, editorPort, previewPort, machineId },
    })
  }

  const startProject = ({ id, editorPort, previewPort, machineId }) => {
    setCurrentProject({
      id,
      editorPort,
      previewPort,
      machineId,
    })
    navigate('/app/editor/')
  }

  useEffect(() => {
    const githubLink =
      location.hash.match(/#(.*)/) && location.hash.match(/#(.*)/)[1]

    githubLink && createProject({ githubLink, dispatch, user })
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

const Layout = props => (
  <Location>
    {({ location }) => <LayoutComponent {...props} location={location} />}
  </Location>
)

export default Layout
