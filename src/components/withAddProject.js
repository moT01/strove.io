import { useEffect, memo } from 'react'
import { getWindowHref } from 'utils'

export default memo(({ children, addProject }) => {
  useEffect(() => {
    const repoUrl =
      getWindowHref()?.match(/#(.*)/) && getWindowHref().match(/#(.*)/)[1]

    repoUrl &&
      /.*(github|gitlab|bitbucket).(com|org)\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+/i.test(
        repoUrl
      ) &&
      addProject({ link: repoUrl })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
})
