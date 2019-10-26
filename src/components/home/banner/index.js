import React from 'react'
import { window } from 'utils'
import { useInterval } from 'hooks'

import Education from './education'
import Enterprise from './enterprise'

const checkGoogleOptimizeLoading = () => {
  if (window?.google_optimize !== undefined) {
    const variant = window.google_optimize.get(process.env.GOOGLE_OPTIMIZE_ID)
    this.setState({ variant })
  }
}

export default props => {

  useInterval(
    checkGoogleOptimizeLoading,
    window?.google_optimize ? 100 : null
  )

  if (window?.location?.href?.includes('strove.io')) {
    return <Enterprise {...props} />
  } else {
    return <Education {...props} />
  }
}
