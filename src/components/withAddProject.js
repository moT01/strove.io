import { useEffect, memo } from 'react'
import { window } from 'utils'

export default memo(({ children, addProject }) => {
  useEffect(() => {
    let link =
      window?.location?.href?.match(/#(.*)/) &&
      window.location.href.match(/#(.*)/)[1]

    link &&
      /.*(github|gitlab|bitbucket).(com|org)/i.test(link) &&
      addProject({ link })
  }, [])

  return children
})
