import { mutation, updateOrganizations } from 'utils'
import { STOP_PROJECT } from 'queries'
import store from 'store'

const handleStopProject = ({ id, dispatch }) => {
  const state = store.getState()

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
