import { handleActions } from 'redux-actions'
import * as C from './constants'

const initialState = null

export default handleActions(
  {
    [C.SELECT_CURRENT_PROJECT]: (
      state,
      {
        payload: {
          id,
          editorPort,
          machineId,
          repoUrl,
          repoProvider,
          additionalPorts,
        },
      }
    ) => ({
      ...state,
      id,
      editorPort,
      machineId,
      repoUrl,
      repoProvider,
      additionalPorts,
    }),
    [C.STOP_CURRENT_PROJECT]: () => initialState,
  },
  initialState
)
