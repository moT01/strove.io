import ApolloClient from 'apollo-boost'
import { navigate } from 'gatsby'

import { mutation } from 'utils'
import * as ApiC from 'state/api/constants'
import { ADD_PROJECT, GET_REPO_INFO } from 'queries'
import * as C from 'state/currentProject/constants'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
})

const createProject = async ({ repoLink, dispatch, user }) => {
  const query = GET_REPO_INFO

  const setCurrentProject = ({ id, editorPort, machineId }) =>
    dispatch({
      type: C.SELECT_CURRENT_PROJECT,
      payload: { id, editorPort, machineId },
    })

  const startProject = project => {
    setCurrentProject({
      id: project.id,
      editorPort: project.editorPort,
      machineId: project.machineId,
      additionalPorts: project.additionalPorts,
    })
    navigate('/app/editor/')
  }
  const repoUrlParts = repoLink.split('/')
  const repoProvider = repoUrlParts[2].split('.')[0]
  const owner = repoUrlParts[3]
  const name = repoUrlParts[4]
  const variables = { owner, name }
  try {
    let repoData = null

    switch (repoProvider.toString()) {
      case 'github':
        if (user.githubToken) {
          const context = {
            headers: {
              Authorization: `Bearer ${user.githubToken}`,
              'User-Agent': 'node',
            },
          }

          const { data } = await client.query({
            query,
            context,
            variables,
            fetchPolicy: 'no-cache',
          })

          repoData = data.repository
        }
        break
      case 'gitlab':
        if (user.gitlabToken) {
          const res = await fetch(
            `https://gitlab.com/api/v4/projects/${owner}%2F${name}`,
            {
              headers: {
                Authorization: `Bearer ${user.gitlabToken}`,
              },
            }
          )
          repoData = await res.json()
        }
        break
      case 'bitbucket':
        break
      default:
        break
    }

    if (repoData) {
      const {
        description,
        name /* add language and color in future */,
      } = repoData

      dispatch(
        mutation({
          name: 'addProject',
          storeKey: 'myProjects',
          /* ToDo: Support Gitlab and Bitbucket as well */
          variables: { repoLink, name, description },
          mutation: ADD_PROJECT,
          onSuccess: startProject,
        })
      )
    }
  } catch (e) {
    console.log('fetch error: ', e)
    dispatch({
      type: ApiC.FETCH_ERROR,
      payload: { storeKey: 'myProjects', error: e },
    })
  }
}

export default createProject
