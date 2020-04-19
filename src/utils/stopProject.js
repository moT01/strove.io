import { mutation, updateOrganizations } from 'utils'
import { STOP_PROJECT } from 'queries'
import store from 'store'
import { selectors } from 'state'

const handleStopProject = ({ id }) => {
  const state = store.getState()
  const dispatch = store.dispatch
  const currentProject = selectors.api.getCurrentProject(state)

  console.log('currentProject', currentProject)

  dispatch(
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
