import * as C from './consts'
import { REHYDRATE } from 'redux-persist'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_INCOMIN_ACCEPT: {
      const { teamId, teamName } = action.payload
      return {
        ...state,
        teamId,
        teamName,
      }
    }
  }
}
