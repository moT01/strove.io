import React, { memo } from 'react'

import { SEO, Layout, Home } from 'components'

const IndexPage = () => (
  <Layout>
    <SEO title="Strove" />
    <Home />
  </Layout>
)

export default memo(IndexPage)
