import React, { useEffect } from 'react'

import { query, mutation } from 'utils'
import * as ApiC from 'state/api/constants'
import { selectors } from 'state'

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
    dispatch({
      type: ApiC.FETCH_ERROR,
      payload: { storeKey: 'myProjects', error: e },
    })
  }
}

export default addProject
