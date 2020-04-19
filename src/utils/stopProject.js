import { mutation, updateOrganizations } from 'utils'
import { STOP_PROJECT, STOP_LIVE_SHARE } from 'queries'
import store from 'store'
import { selectors } from 'state'

const handleStopProject = ({ id, isLiveshare = false }) => {
  const state = store.getState()
  const dispatch = store.dispatch
  const currentProject = selectors.api.getCurrentProject(state)

  if (isLiveshare) {
    return dispatch(
      mutation({
        name: 'stopLiveShare',
        mutation: STOP_LIVE_SHARE,
        variables: { projectId: currentProject.id },
        onSuccessDispatch: updateOrganizations,
      })
    )
  }

  return dispatch(
    mutation({
      name: 'stopProject',
      mutation: STOP_PROJECT,
      dataSelector: data => data,
      variables: { projectId: id || currentProject?.id },
      onSuccessDispatch: updateOrganizations,
    })
  )
}

export default handleStopProject
