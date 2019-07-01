import React, { useEffect } from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'
import { Location } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'

import ApolloClient from 'apollo-boost'
import { mutation } from 'utils'
import Header from './header'
import { ADD_GITHUB_PROJECT, GET_REPO_INFO } from 'queries'
import { selectors } from 'state'
import './layout.css'
import Loader from 'components/loader.js'
import * as C from 'state/currentProject/constants'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
})

const LayoutComponent = ({ children, location }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const isLoading = useSelector(selectors.getLoading('myProjects'))

  const setCurrentProject = ({ editorPort, previewPort, machineId }) => {
    dispatch({
      type: C.SELECT_CURRENT_PROJECT,
      payload: { editorPort, previewPort, machineId },
    })
  }

  const startProject = project => {
    setCurrentProject({
      editorPort: project.editorPort,
      previewPort: project.previewPort,
      machineId: project.machineId,
    })
    navigate('/app/editor/', {
      state: {
        machineId: project.machineId,
        editorPort: project.editorPort,
      },
    })
  }

  useEffect(() => {
    const githubLink =
      location.hash.match(/#(.*)/) && location.hash.match(/#(.*)/)[1]

    if (githubLink) {
      const addProject = async () => {
        const query = GET_REPO_INFO
        const context = {
          headers: {
            Authorization: `Bearer ${user.githubToken}`,
            'User-Agent': 'node',
          },
        }
        const repoUrlParts = githubLink.split('/')
        const owner = repoUrlParts[3]
        const name = repoUrlParts[4]
        const variables = { owner, name }
        try {
          const { data } = await client.query({
            query,
            context,
            variables,
            fetchPolicy: 'no-cache',
          })

          const {
            description,
            name /* add language and color in future */,
          } = data.repository

          dispatch(
            mutation({
              name: 'addProject',
              storeKey: 'myProjects',
              variables: { githubLink, name, description },
              mutation: ADD_GITHUB_PROJECT,
              onSuccess: startProject,
            })
          )
        } catch (e) {
          console.log('fetch error: ', e)
        }
      }
      addProject()
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              textAlign: 'center',
              margin: `0 auto`,
              maxWidth: '100vw',
              paddingTop: 0,
            }}
          >
            <main>{isLoading ? <Loader /> : children}</main>
          </div>
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
