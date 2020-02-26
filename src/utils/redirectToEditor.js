import { actions } from 'state'

import { getWindowPathName, getWindowSearchParams } from './windowUtils'

export default (dispatch, history) => {
  dispatch(actions.incomingProject.removeIncomingProject())
  const path = getWindowPathName()
  if (path.includes('embed')) {
    console.log('TCL: embed')
    const searchParams = getWindowSearchParams()
    const repoUrl = searchParams.get('repoUrl')
    history.push(`/embed/editor/?repoUrl=${repoUrl}`)
  } else {
    history.push('/app/editor/')
    console.log('TCL: editor')
  }
}
