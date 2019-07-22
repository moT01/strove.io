import { combineReducers } from 'redux'
import api from './api/reducer'
import * as S from './api/selectors'
import * as Sel from './currentProject/selectors'
import currentProject from './currentProject/reducer'
import incomingProject from './incomingProject/reducer'
import * as incomingProjectActions from './incomingProject/actions'

export const selectors = S

export const projectSelectors = Sel

export const actions = {
  incomingProject: incomingProjectActions,
}

export default combineReducers({ api, currentProject, incomingProject })
