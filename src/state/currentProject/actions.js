import { createAction } from 'redux-actions'

import * as C from './constants'

export const selectCurrentProject = createAction(
  C.SELECT_CURRENT_PROJECT,
  ({ id, machineId, editorPort }) => ({
    id,
    machineId,
    editorPort,
  })
)
