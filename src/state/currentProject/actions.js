import * as C from './consts'

export const setCurrentProject = ({ project }) => ({
  type: C.SET_CURRENT_PROJECT,
  data: project,
})

export const resetCurrentProject = () => ({
  type: C.RESET_CURRENT_PROJECT,
})
