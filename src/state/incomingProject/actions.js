import { createAction } from 'redux-actions'

import * as C from './constants'

export const selectProject = createAction(
  C.ADD_INCOMING_PROJECT,
  ({ repoLink, repoProvider }) => ({
    repoLink,
    repoProvider,
  })
)
