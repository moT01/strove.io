import { useEffect, memo } from 'react'
import { getWindowHref } from 'utils'

export default memo(({ children, addProject }) => {
  useEffect(() => {
    let link =
      getWindowHref()?.match(/#(.*)/) && getWindowHref().match(/#(.*)/)[1]

    link &&
      /.*(github|gitlab|bitbucket).(com|org)/i.test(link) &&
      addProject({ link })
  }, [])

  return children
})
