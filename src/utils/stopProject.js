import { query, mutation, updateOrganizations } from 'utils'
import { STOP_PROJECT, MY_PROJECTS, MY_ORGANIZATIONS } from 'queries'

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
