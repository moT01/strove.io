import { handleActions } from 'redux-actions'
import * as C from './constants'
import reducer from '../api/reducer'

const initialState = {
  currentProject: null,
}

// export default handleActions(
//   {
//     SELECT_CURRENT_PROJECT: (state, action) =>
//       console.log('action', action) || {
//         ...state,
//       },
//   },
//   initialState
// )

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
