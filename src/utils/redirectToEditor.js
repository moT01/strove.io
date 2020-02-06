import { actions } from 'state'

import { getWindowPathName, getWindowSearchParams } from './windowUtils'

export default (dispatch, history) => {
  dispatch(actions.incomingProject.removeIncomingProject())
  const path = getWindowPathName()
  /*
    If we are to prevent redirecting to editor, we can do so with the following line
    if (document.visibilityState === 'visible') {
  */
  if (path.includes('embed')) {
    const searchParams = getWindowSearchParams()
    const repoUrl = searchParams.get('repoUrl')
    history.push(`/embed/editor/?repoUrl=${repoUrl}`)
  } else {
    history.push('/app/editor/')
  }
}
