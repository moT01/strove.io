import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

import api from './api'
import incomingProject from './incomingProject'
import latency from './latency'

const rootConfig = {
  key: 'root',
  storage: storage,
  blacklist: 'api',
}

const persistConfig = {
  key: 'api',
  storage,
  stateReconciler: autoMergeLevel2,
}

export const selectors = {
  api: api.selectors,
  incomingProject: incomingProject.selectors,
  latency: latency.selectors,
}
export const actions = {
  api: api.actions,
  incomingProject: incomingProject.actions,
  latency: latency.actions,
}

export const C = {
  api: api.C,
  incomingProject: incomingProject.C,
  latency: latency.C,
}

const appReducer = combineReducers({
  api: persistReducer(persistConfig, api.reducer),
  incomingProject: incomingProject.reducer,
  latency: latency.reducer,
})

export default persistReducer(rootConfig, (state, action) => {
  if (action.type === api.C.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
})
