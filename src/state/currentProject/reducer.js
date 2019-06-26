import { handleActions } from 'redux-actions'

const initialState = {
  currentProject: null,
}

export default handleActions(
  {
    SELECT_CURRENT_PROJECT: (
      state,
      { payload: { editorPort, previewPort, machineId } }
    ) =>
      console.log('editorPort', editorPort) || {
        ...state,
        editorPort,
        previewPort,
        machineId,
      },
  },
  initialState
)
