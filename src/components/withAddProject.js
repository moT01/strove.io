import { useEffect, memo } from 'react'
import { getWindowHref, getRepoUrl } from 'utils'

export default memo(({ children, addProject }) => {
  useEffect(() => {
    const repoUrl =
      (getWindowHref()?.match(/#(.*)/) && getWindowHref().match(/#(.*)/)[1]) ||
      getRepoUrl()

    repoUrl &&
      /.*(github|gitlab|bitbucket).(com|org)/i.test(repoUrl) &&
      addProject({ link: repoUrl })
  }, [])

  return children
})
