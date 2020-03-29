import { mutation, updateOrganizations } from 'utils'
import { STOP_PROJECT } from 'queries'

const handleStopProject = ({ id, dispatch }) => {
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
