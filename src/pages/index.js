/* eslint-disable */
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Logos from "../components/logos"
import Try from "../components/try"
import Circle from "../components/circle"

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="SiliSky" />
        <Circle />
        <Logos />
        <Try />
      </Layout>
    )
  }
}
/* eslint-enable */
export default IndexPage

export const query = graphql`
  query {
    silisky {
      users {
        email
      }
    }
  }
`

export default IndexPage
