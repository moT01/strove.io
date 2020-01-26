import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

import api from './api'
import incomingProject from './incomingProject'
import invitations from './invitations'
import latency from './latency'
import feature from './feature'

const rootConfig = {
  key: 'root',
  storage,
  blacklist: ['api', 'invitations'],
}

const persistConfig = {
  key: 'api',
  storage,
  stateReconciler: autoMergeLevel2,
}

// const persistInvitationConfig = {
//   key: 'invitations',
//   storage,
// }

export const selectors = {
  api: api.selectors,
  incomingProject: incomingProject.selectors,
  latency: latency.selectors,
  feature: feature.selectors,
  invitations: invitations.selectors,
  // ToDo Remove siliskyToken later on
  getToken:
    api.selectors.getUserField('token') ||
    api.selectors.getUserField('siliskyToken'),
}
export const actions = {
  api: api.actions,
  incomingProject: incomingProject.actions,
  latency: latency.actions,
  feature: feature.actions,
  invitations: invitations.actions,
}

export const C = {
  api: api.C,
  incomingProject: incomingProject.C,
  latency: latency.C,
  feature: feature.C,
  invitations: invitations.C,
}

const appReducer = combineReducers({
  // invitations: persistReducer(persistInvitationConfig, invitations.reducer),
  api: persistReducer(persistConfig, api.reducer),
  incomingProject: incomingProject.reducer,
  latency: latency.reducer,
  feature: feature.reducer,
})

export default persistReducer(rootConfig, (state, action) => {
  if (action.type === api.C.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
})
