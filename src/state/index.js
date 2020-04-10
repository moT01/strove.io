import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import { REHYDRATE } from 'redux-persist'

import api from './api'
import incomingProject from './incomingProject'
import invitations from './invitations'
import latency from './latency'
import feature from './feature'
import editedOrganization from './editedOrganization'
import currentProject from './currentProject'
import guestInvitation from './guestInvitation'

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

const persistInvitationConfig = {
  key: 'invitations',
  storage,
}

// const persistGuestInvitationConfig = {
//   key: 'guestInvitation',
//   storage,
// }

const getToken = state => {
  return (
    api.selectors.getUserField('token')(state) ||
    api.selectors.getUserField('siliskyToken')(state)
  )
}

export const selectors = {
  api: api.selectors,
  incomingProject: incomingProject.selectors,
  latency: latency.selectors,
  feature: feature.selectors,
  invitations: invitations.selectors,
  editedOrganization: editedOrganization.selectors,
  currentProject: currentProject.selectors,
  guestInvitation: guestInvitation.selectors,

  // ToDo Remove siliskyToken later on
  getToken,
}
export const actions = {
  api: api.actions,
  incomingProject: incomingProject.actions,
  latency: latency.actions,
  feature: feature.actions,
  invitations: invitations.actions,
  editedOrganization: editedOrganization.actions,
  currentProject: currentProject.actions,
  guestInvitation: guestInvitation.actions,
}

export const C = {
  api: api.C,
  incomingProject: incomingProject.C,
  latency: latency.C,
  feature: feature.C,
  invitations: invitations.C,
  editedOrganization: editedOrganization.C,
  currentProject: currentProject.C,
  guestInvitation: guestInvitation.C,
}

const appReducer = combineReducers({
  // guestInvitation: persistReducer(
  //   persistGuestInvitationConfig,
  //   guestInvitation.reducer
  // ),
  invitations: persistReducer(persistInvitationConfig, invitations.reducer),
  api: persistReducer(persistConfig, api.reducer),
  incomingProject: incomingProject.reducer,
  latency: latency.reducer,
  feature: feature.reducer,
  editedOrganization: editedOrganization.reducer,
  currentProject: currentProject.reducer,
})

export default persistReducer(rootConfig, (state, action) => {
  if (action.type === api.C.LOGOUT) {
    state = undefined
  }

  const token = getToken(state)

  if (token && action.type === REHYDRATE) {
    return state
  }

  return appReducer(state, action)
})
