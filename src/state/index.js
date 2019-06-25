import { combineReducers } from 'redux'
import api from './api/reducer'
import * as S from './api/selectors'
import currentProject from './currentProject/reducer'

export const selectors = S

export default combineReducers({ api, currentProject })
