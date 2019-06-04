/* eslint-disable */
import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Logos from "../components/logos"
import Try from "../components/try"

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
        <SEO title="SiliSky" />
        <Logos />
        <Try />
      </Layout>
    )
  }
}
/* eslint-enable */
export default IndexPage
