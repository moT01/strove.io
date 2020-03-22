import * as C from './consts'

export const setEditedOrganization = ({ organization, team }) => ({
  type: C.SET_EDITED_ORGANIZATION,
  payload: {
    organization,
    team,
  },
})

export const resetEditedOrganization = () => ({
  type: C.RESET_EDITED_ORGANIZATION,
})
