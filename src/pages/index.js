import React, { memo } from 'react'

import Layout from 'components/layout'
import SEO from 'components/seo'
import AntDesign from '../Home'

const IndexPage = () => (
  <Layout>
    <SEO title="SiliSky" />
    <AntDesign />
  </Layout>
)

export default memo(IndexPage)
