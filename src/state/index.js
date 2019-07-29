import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

import api from './api'
import currentProject from './currentProject'
import incomingProject from './incomingProject'

const persistConfig = {
  key: 'api',
  storage,
  stateReconciler: autoMergeLevel2,
}

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

export const C = {
  api: api.C,
  currentProject: currentProject.C,
  incomingProject: incomingProject.C,
}

const appReducer = combineReducers({
  api: persistReducer(persistConfig, api.reducer),
  currentProject: currentProject.reducer,
  incomingProject: incomingProject.reducer,
})

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
