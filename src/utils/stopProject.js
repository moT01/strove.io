import { mutation, updateOrganizations } from 'utils'
import { STOP_PROJECT, STOP_LIVE_SHARE } from 'queries'
import store from 'store'
import { selectors } from 'state'

const handleStopProject = ({ id, onSuccess } = {}) => {
  const state = store.getState()
  const dispatch = store.dispatch
  const currentProject = selectors.api.getCurrentProject(state)
  const isLiveshare = currentProject.startedCollaborationFromId
  const projectId = id || currentProject?.id

  if (isLiveshare) {
    return dispatch(
      mutation({
        name: 'stopLiveShare',
        mutation: STOP_LIVE_SHARE,
        variables: { projectId },
        onSuccessDispatch: updateOrganizations,
        onSuccess
      })
    )
  }

  return dispatch(
    mutation({
      name: 'stopProject',
      mutation: STOP_PROJECT,
      dataSelector: data => data,
      variables: { projectId },
      onSuccessDispatch: updateOrganizations,
    })
  )
}

export default handleStopProject
