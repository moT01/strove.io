import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"

import SEO from "components/seo"

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
`

const getProjectPort = () => "58852"

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

const Preview = () => {
  const token = useSelector(getToken)
  const id = useSelector(getId)
  const port = useSelector(getPort)
  return (
    <>
      <SEO title="Preview" />
      <StyledIframe
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${token}&id=${id}&port=${port}`}
      />
    </>
  )
}

export default Preview
