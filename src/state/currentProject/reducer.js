import { handleActions } from 'redux-actions'

const initialState = {}

export default handleActions(
  {
    SELECT_CURRENT_PROJECT: (
      state,
      { payload: { editorPort, previewPort, machineId, isRunning } }
    ) => ({
      ...state,
      editorPort,
      previewPort,
      machineId,
    }),
  },
  initialState
)
