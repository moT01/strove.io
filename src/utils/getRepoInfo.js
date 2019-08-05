import ApolloClient from 'apollo-boost'

import { C } from 'state'
import { GET_REPO_INFO } from 'queries'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
})

const getRepoInfo = async ({ repoLink, dispatch, user }) => {
  const query = GET_REPO_INFO

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
          return repoData
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
  } catch (error) {
    console.log('fetch error: ', error)
    dispatch({
      type: C.incomingProject.CATCH_INCOMING_ERROR,
      payload: { error },
    })
  }
}

export default getRepoInfo
