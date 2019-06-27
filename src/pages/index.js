import React from 'react'

import Layout from 'components/layout'
import SEO from 'components/seo'
import AntDesign from '../Home'

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="SiliSky" />
        <AntDesign />
      </Layout>
    )
  }
}

export default IndexPage
