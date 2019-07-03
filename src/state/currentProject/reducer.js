import { handleActions } from 'redux-actions'
import * as C from './constants'

const initialState = {}

export default handleActions(
  {
    [C.SELECT_CURRENT_PROJECT]: (
      state,
      { payload: { id, editorPort, previewPort, machineId } }
    ) => ({
      ...state,
      id,
      editorPort,
      previewPort,
      machineId,
    }),
    [C.STOP_CURRENT_PROJECT]: (state, { payload: { id } }) => ({
      id,
      editorPort: null,
      previewPort: null,
      machineId: null,
    }),
  },
  initialState
)
