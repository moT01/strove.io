import ApolloClient from 'apollo-boost'

import { mutation, getRepoProvider } from 'utils'
import { actions } from 'state'
import { ADD_PROJECT, GET_REPO_INFO, GET_BITBUCKET_TOKEN } from 'queries'

import stroveClient from '../../client'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
})

const createProject = async ({
  repoLink,
  dispatch,
  user,
  setModalContent,
  name,
}) => {
  let repoData = null
  const customName = name
  try {
    if (repoLink) {
      const query = GET_REPO_INFO
      const repoProvider = getRepoProvider(repoLink)
      const repoUrlParts = repoLink.split('/')
      const owner = repoUrlParts[3]
      const name = repoUrlParts[4]
      dispatch(actions.incomingProject.setProjectIsBeingAdded())

      const variables = { owner, name }
      switch (repoProvider) {
        case 'github': {
          if (user.githubToken) {
            const context = {
              headers: {
                Authorization: `Bearer ${user.githubToken}`,
                'User-Agent': 'node',
              },
            }
            try {
              const { data } = await client.query({
                query,
                context,
                variables,
                fetchPolicy: 'no-cache',
              })
              repoData = data.repository
            } catch (error) {
              console.log('error', error)
              dispatch(actions.incomingProject.catchIncomingError({ error }))
              setModalContent('UnableToClone')
            }
          }
          break
        }
        case 'gitlab': {
          if (user.gitlabToken) {
            try {
              const res = await fetch(
                `https://gitlab.com/api/v4/projects/${owner}%2F${name}`,
                {
                  headers: {
                    Authorization: `Bearer ${user.gitlabToken}`,
                  },
                }
              )
              repoData = await res.json()
            } catch (error) {
              dispatch(actions.incomingProject.catchIncomingError({ error }))
              setModalContent('TryAgainLaterButGitlabIsToBlame')
            }
          }
          break
        }
        case 'bitbucket': {
          const access_token = await stroveClient.query({
            query: GET_BITBUCKET_TOKEN,
            context: {
              headers: {
                Authorization: `Bearer ${user.siliskyToken}`,
                'User-Agent': 'node',
              },
            },
            fetchPolicy: 'no-cache',
          })

          const token = access_token?.data?.getbitBucketToken

          /* Todo: This endpoint does not allow 10+ results. Investigate other ways to do it. */
          if (token) {
            const { values } = await fetch(
              `https://api.bitbucket.org/2.0/users/${user.bitbucketName}/repositories`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'GET',
              }
            ).then(res => res.json())

            repoData = values.find(
              repo => repo.name.toLowerCase() === name.toLowerCase()
            )

            if (!repoData) setModalContent('UnableToClone')
          }
          break
        }
        default:
          break
      }
    }

    if (repoLink && !repoData && !customName) {
      setModalContent('UnableToClone')
      return null
    }

    if (!repoData && !repoLink) {
      repoData = { name: customName, description: '' }
    }

    const { description, name /* add language and color */ } = repoData

    console.log('{ repoLink, name, description }', {
      repoLink,
      name,
      description,
    })
    dispatch(
      mutation({
        name: 'addProject',
        storeKey: 'myProjects',
        variables: { repoLink, name, description },
        mutation: ADD_PROJECT,
        onSuccessDispatch: null,
        onError: error => {
          setModalContent('TryAgainLater')
          dispatch(actions.api.fetchError({ storeKey: 'myProjects', error }))
          dispatch(actions.incomingProject.catchIncomingError({ error }))
        },
      })
    )
  } catch (error) {
    console.log('fetch error: ', error)
    dispatch(actions.incomingProject.catchIncomingError({ error }))
    setModalContent('TryAgainLater')
  }
}
export default createProject
