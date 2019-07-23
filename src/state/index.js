import { combineReducers } from 'redux'
import api from './api'
import currentProject from './currentProject'
import incomingProject from './incomingProject'

export const selectors = {
  api: api.selectors,
  currentProject: currentProject.selectors,
  incomingProject: incomingProject.selectors,
}
export const actions = {
  api: api.actions,
  currentProject: currentProject.actions,
  incomingProject: incomingProject.actions,
}

const appReducer = combineReducers({
  api: api.reducer,
  currentProject: currentProject.reducer,
  incomingProject: incomingProject.reducer,
})

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
