import * as C from './consts'
export const addInvitation = ({ teamId, teamName }) => ({
  type: C.ADD_INVITATION,
  payload: {
    teamId,
    teamName,
  },
})
export const acceptInvitation = () => ({
  type: C.ACCEPT_INVITATION,
})
