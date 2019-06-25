import { createAction } from 'redux-actions'

import * as C from './constants'

export const selectProject = createAction(
  C.SELECT_CURRENT_PROJECT,
  ({ machineId, previewPort, editorPort }) => ({
    machineId,
    previewPort,
    editorPort,
  })
)
