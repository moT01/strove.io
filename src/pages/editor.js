import React, { useState, useEffect } from "react"
import styled from "styled-components"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"

import Layout from "components/layout"
import SEO from "components/seo"

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

const getProjectPort = () => "23648"

const getMachineId = () => "5d0e233ef9265ebc230bae22"

const getUserToken = state =>
  state.fetch.user.data && state.fetch.user.data.siliskyToken

const getToken = createSelector(
  [getUserToken],
  token => token
)

const getId = createSelector(
  [getMachineId],
  machineId => machineId
)

const getPort = createSelector(
  [getProjectPort],
  port => port
)

const Editor = () => {
  const dispatch = useDispatch()

  const token = useSelector(getToken)
  const id = useSelector(getId)
  const port = useSelector(getPort)

  return (
    <Layout>
      <SEO title="Editor" />
      {/* <Query query={QUERY}>
        {({ data, loading, error }) => {
          if (loading || error) return null
          return <h1>{data.users[0].email}</h1>
        }}
      </Query> */}
      <StyledIframe
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/editor?token=${token}&id=${id}&port=${port}`}
      />
    </Layout>
  )
}

export default Editor
