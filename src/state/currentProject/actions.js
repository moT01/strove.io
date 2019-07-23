import * as C from './constants'

export const selectCurrentProject = ({ id, machineId, editorPort }) => ({
  type: C.SELECT_CURRENT_PROJECT,
  payload: {
    id,
    machineId,
    editorPort,
  },
})
