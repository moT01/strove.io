import { combineReducers } from 'redux'
import api from './api/reducer'
import * as S from './api/selectors'
import * as Sel from './currentProject/selectors'
import currentProject from './currentProject/reducer'

export const selectors = S

export const projectSelectors = Sel

export default combineReducers({ api, currentProject })
