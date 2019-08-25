import ApolloClient from 'apollo-boost'
import { navigate } from 'gatsby'

import { mutation } from 'utils'
import { C, actions } from 'state'
import { ADD_PROJECT, GET_REPO_INFO } from 'queries'
import getBitbucketToken from './getBitbucketToken'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
})

const startProject = () => {
  navigate('/app/editor/')
}

const createProject = async ({
  repoLink,
  dispatch,
  user,
  addProject,
  setModalContent,
}) => {
  const query = GET_REPO_INFO

  const repoUrlParts = repoLink.split('/')
  let repoProvider = repoUrlParts[2].split('.')[0]
  if (repoProvider.toString().length > 6)
    repoProvider = repoProvider.split('@')[1]
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
          try {
            const { data } = await client.query({
              query,
              context,
              variables,
              fetchPolicy: 'no-cache',
            })

            repoData = data.repository
          } catch (error) {
            dispatch({
              type: C.incomingProject.CATCH_INCOMING_ERROR,
              payload: { error },
            })
            setModalContent('UnableToClone')
          }
        }
        break
      case 'gitlab':
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
            dispatch({
              type: C.incomingProject.CATCH_INCOMING_ERROR,
              payload: { error },
            })
            setModalContent('TryAgainLaterButGitlabIsToBlame')
          }
        }
        break
      case 'bitbucket':
        const access_token = await getBitbucketToken(user.bitbucketRefreshToken)

        const { values } = await fetch(
          `https://api.bitbucket.org/2.0/users/${user.fullName}/repositories`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'GET',
          }
        ).then(res => res.json())

        repoData = values.find(
          repo => repo.name.toLowerCase() === name.toLowerCase()
        )
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
          /* ToDo: Support Bitbucket as well */
          variables: { repoLink, name, description },
          mutation: ADD_PROJECT,
          onSuccess: [
            startProject,
            () => dispatch(actions.incomingProject.removeIncomingProject()),
          ],
          onError: () => setModalContent('TryAgainLater'),
          onErrorDispatch: [
            error =>
              dispatch({
                type: C.incomingProject.CATCH_INCOMING_ERROR,
                payload: { error },
              }),
            () =>
              dispatch({
                type: C.api.FETCH_ERROR,
                payload: { storeKey: 'myProjects' },
              }),
          ],
        })
      )
    }
  } catch (error) {
    console.log('fetch error: ', error)
    dispatch({
      type: C.incomingProject.CATCH_INCOMING_ERROR,
      payload: { error },
    })
    setModalContent('TryAgainLater')
  }
}

export default createProject
