import { handleActions } from 'redux-actions'
import * as C from './constants'

const initialState = {}

export default handleActions(
  {
    /* We only want to change current project after it has been successfully cloned and selected */
    [C.SUBMIT_REPO_LINK]: (state, { payload: { repoLink, repoProvider } }) => ({
      ...state,
      repoLink,
      repoProvider,
      isAddingNewProject: true,
    }),
    [C.SELECT_CURRENT_PROJECT]: (state, { payload }) => ({
      ...state,
      id,
      editorPort,
      previewPort,
      machineId,
      isAddingNewProject: false,
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
