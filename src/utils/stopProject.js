import { mutation, updateOrganizations } from 'utils'
import { STOP_PROJECT } from 'queries'
import store from 'store'
import { selectors } from 'state'

const handleStopProject = ({ id, dispatch }) => {
  const state = store.getState()
  const currentProject = selectors.api.getCurrentProject(state)

  dispatch(
    mutation({
      name: 'stopProject',
      mutation: STOP_PROJECT,
      dataSelector: data => data,
      variables: { projectId: id },
      onSuccessDispatch: updateOrganizations,
    })
  )
}

export default handleStopProject
