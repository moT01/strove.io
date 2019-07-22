import { createAction } from 'redux-actions'

import * as C from './constants'

export const addIncomingProject = ({ repoLink, repoProvider }) => ({
  type: C.ADD_INCOMING_PROJECT,
  payload: {
    repoLink,
    repoProvider,
  },
})

export const removeIncomingProject = () => ({ type: C.REMOVE_INCOMING_PROJECT })
