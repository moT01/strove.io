/* eslint-disable */
import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Logos from "../components/logos"

// const Button = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   height: 30px;
//   width: 150px;
//   background-color: lime;
//   align-self: center;
// `

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="CoLab" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Logos />
        {/* <Button> */}
        <Link to="/page-2/">And many more!</Link>
        {/* </Button> */}
      </Layout>
    )
  }
}
/* eslint-enable */
export default IndexPage
