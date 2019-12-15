import React, { memo } from 'react'

import { SEO, Header, Home } from 'components'

const IndexPage = () => (
  <>
    <SEO title="Strove" />
    <Header />
    <Home />
  </>
)

export default memo(IndexPage)
