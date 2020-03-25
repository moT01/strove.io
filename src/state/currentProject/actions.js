import * as C from './consts'

export const setEditedOrganization = ({ project }) => ({
  type: C.SET_CURRENT_PROJECT,
  payload: {
    project,
  },
})

export const resetEditedOrganization = () => ({
  type: C.RESET_CURRENT_PROJECT,
})
