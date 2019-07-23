import * as C from './constants'

export default (state = null, action) => {
  switch (action.type) {
    case C.SELECT_CURRENT_PROJECT: {
      const {
        id,
        editorPort,
        machineId,
        repoUrl,
        repoProvider,
        additionalPorts,
      } = action.payload
      return {
        ...state,
        id,
        editorPort,
        machineId,
        repoUrl,
        repoProvider,
        additionalPorts,
      }
    }

    case C.STOP_CURRENT_PROJECT:
      return null
    default:
      return state
  }
}
