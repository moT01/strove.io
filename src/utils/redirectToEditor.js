import { navigate } from 'gatsby'
import { getWindowPathName, getWindowSearchParams } from './windowUtils'

export default () => {
  const path = getWindowPathName()
  if (path.includes('embed')) {
    const searchParams = getWindowSearchParams()
    const repoUrl = searchParams.get('repoUrl')
    navigate(`/embed/runProject/?repoUrl=${repoUrl}`)
  } else {
    navigate('/app/dashboard')
  }
}
