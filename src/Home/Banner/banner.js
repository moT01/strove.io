import React from 'react'
import { window } from 'utils'

import Education from './education'
import Enterprise from '/enterprise'

export default props => {
  if (window?.location?.href?.includes('strove.io')) {
    return <Enterprise {...props} />
  } else {
    return <Education {...props} />
  }
}
