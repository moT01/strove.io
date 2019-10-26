import React from 'react'
import { window } from 'utils'

import Education from 'components/pricing/education'
import Enterprise from 'components/pricing/enterprise'

export default props => {
  if (window?.location?.href?.includes('strove.io')) {
    return <Enterprise {...props} />
  } else {
    return <Education {...props} />
  }
}
