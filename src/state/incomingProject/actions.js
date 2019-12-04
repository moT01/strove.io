import * as C from './constants'

export const addIncomingProject = ({ repoLink, repoProvider, name }) => ({
  type: C.ADD_INCOMING_PROJECT,
  payload: {
    repoLink,
    repoProvider,
    name,
  },
})

export const setProjectIsBeingAdded = () => ({
  type: C.SET_PROJECT_IS_BEING_ADDED,
})

export const setProjectIsBeingStarted = () => ({
  type: C.SET_PROJECT_IS_BEING_STARTED,
})
export const catchIncomingError = ({ error }) => ({
  type: C.CATCH_INCOMING_ERROR,
  payload: { error },
})

export const removeIncomingProject = () => ({ type: C.REMOVE_INCOMING_PROJECT })
