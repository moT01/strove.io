import { handleActions } from 'redux-actions'
import * as C from './constants'

const initialState = {}

export default handleActions(
  {
    [C.SELECT_CURRENT_PROJECT]: (
      state,
      { payload: { id, editorPort, machineId, repoUrl, repoProvider, ports } }
    ) => ({
      ...state,
      id,
      editorPort,
      machineId,
      repoUrl,
      repoProvider,
      ports,
    }),
    [C.STOP_CURRENT_PROJECT]: state => initialState,
  },
  initialState
)
