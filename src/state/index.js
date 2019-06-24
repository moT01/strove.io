import { combineReducers } from 'redux'
// import fetch from './fetch'
import api from './api/reducer'

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return combineReducers({ api })
}
