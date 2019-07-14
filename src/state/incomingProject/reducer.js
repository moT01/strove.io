import { handleActions } from 'redux-actions'
import * as C from './constants'

const initialState = null

export default handleActions(
  {
    /* We only want to change current project after it has been successfully cloned and selected */
    [C.ADD_INCOMING_PROJECT]: ({ payload: { repoLink, repoProvider } }) => ({
      repoLink,
      repoProvider,
      isAddingNewProject: true,
    }),
    [C.REMOVE_INCOMING_PROJECT]: () => initialState,
  },
  initialState
)
