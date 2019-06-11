import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import gql from "graphql-tag"
import { Query } from "react-apollo"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 93vh;
  width: 100vw;
  margin: 0;
`

const QUERY = gql`
  query {
    users {
      email
    }
  }
`

const testToken = "testToken"

const Editor = () => (
  <Layout>
    <SEO title="Page two" />
    <Query query={QUERY}>
      {({ data, loading, error }) => {
        if (loading || error) return null
        return <h1>{data.users[0].email}</h1>
      }}
    </Query>
    <StyledIframe
      src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/editor?token=${testToken}`}
    />
  </Layout>
)

export default Editor
