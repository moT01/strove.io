import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 87vh;
  width: 100vw;
  margin: 0;
`

const testToken = "testToken"

const Editor = () => (
  <Layout>
    <SEO title="Page two" />
    <StyledIframe
      src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${testToken}`}
    />
  </Layout>
)

export default Editor
