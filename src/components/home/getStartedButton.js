import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'

import { StroveButton } from 'components'

const GetStartedButton = ({ history, margin = '0' }) => (
  <StroveButton
    height="56px"
    width="100%"
    fontSize="1.3rem"
    fontWeight="bold"
    isPrimary
    text="Get started"
    margin={margin}
    letterSpacing="0.8px"
    onClick={() => history.push('/welcome/login')}
  />
)

export default withRouter(memo(GetStartedButton))
