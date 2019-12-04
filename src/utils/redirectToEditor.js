import { navigate } from 'gatsby'
import { actions } from 'state'

import { getWindowPathName, getWindowSearchParams } from './windowUtils'

export default dispatch => {
  dispatch(actions.incomingProject.removeIncomingProject())
  const path = getWindowPathName()
  if (path.includes('embed')) {
    const searchParams = getWindowSearchParams()
    const repoUrl = searchParams.get('repoUrl')
    navigate(`/embed/editor/?repoUrl=${repoUrl}`)
  } else {
    navigate('/app/editor/')
  }
}
