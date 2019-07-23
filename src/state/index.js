import { combineReducers } from 'redux'
import api from './api/reducer'
import * as S from './api/selectors'
import * as Sel from './currentProject/selectors'
import * as IncS from './incomingProject/selectors'
import * as incomingProjectActions from './incomingProject/actions'
import currentProject from './currentProject/reducer'
import incomingProject from './incomingProject/reducer'

export const selectors = S

export const projectSelectors = Sel

export const incomingProjectSelectors = IncS

export const actions = {
  incomingProject: incomingProjectActions,
}

const appReducer = combineReducers({
  api,
  currentProject,
  incomingProject,
})

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
