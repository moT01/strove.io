import * as C from './consts'

export const addIncomingAccept = ({ teamId, teamName }) => ({
  type: C.ADD_INCOMING_ACCEPT,
  payload: {
    teamId,
    teamName,
  },
})

export const removeIncomingAccept = () => ({
  type: C.REMOVE_INCOMING_ACCEPT,
})

export const catchIncomingAcceptError = ({ error }) => ({
  type: C.CATCH_INCOMING_ACCEPT_ERROR,
  payload: {
    error,
  },
})
