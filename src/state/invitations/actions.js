import * as C from './consts'

export const addIncomingAccept = ({ teamId, teamName }) => ({
  type: C.ADD_INVITATION,
  payload: {
    teamId,
    teamName,
  },
})

export const removeIncomingAccept = () => ({
  type: C.ACCEPT_INVITATION,
})
