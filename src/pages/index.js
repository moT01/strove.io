import React, { memo } from 'react'

import Layout from 'components/layout'
import SEO from 'components/seo'
import Home from 'components/home'
import GlobalStyles from 'components/globalStyles'

const IndexPage = () => (
  <Layout>
    <GlobalStyles />
    <SEO title="Strove" />
    <Home />
  </Layout>
)

export default memo(IndexPage)
