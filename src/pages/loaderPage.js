import React from 'react'
import styled from 'styled-components'
import Loader from '../components/loader'

import Layout from 'components/layout'
import SEO from 'components/seo'
import AntDesign from '../Home'

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="SiliSky" />
        <Loader />
      </Layout>
    )
  }
}

export default IndexPage
