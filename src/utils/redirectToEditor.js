import { navigate } from 'gatsby'
import { getWindowPathName, getWindowSearchParams } from './windowUtils'

export default () => {
  const path = getWindowPathName()
  if (path.includes('embed')) {
    const searchParams = getWindowSearchParams()
    const repoUrl = searchParams.get('repoUrl')
    navigate(`/embed/editor/?$repoUrl?${repoUrl}`)
  } else {
    navigate('/app/editor/')
  }
}