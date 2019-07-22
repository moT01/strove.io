import { createAction } from 'redux-actions'

import * as C from './constants'

export const addIncomingProject = ({ repoLink, repoProvider }) => ({
  type: C.ADD_INCOMING_PROJECT,
  payload: {
    repoLink,
    repoProvider,
  },
})

export const catchIncomingError = ({ error }) => ({
  type: C.CATCH_INCOMING_ERROR,
  payload: { error },
})

export const removeIncomingProject = () => ({ type: C.REMOVE_INCOMING_PROJECT })
