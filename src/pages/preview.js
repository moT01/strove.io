import React, { useRef, useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
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

const CodeArea = styled.div`
  position: absolute;
  max-width: 640px;
  min-width: 320px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  > span {
    display: block;
  }

  @media screen and (max-width: 320px) {
    .code-area {
      font-size: 5vw;
      min-width: auto;
      width: 95%;
      margin: auto;
      padding: 5px;
      padding-left: 10px;
      line-height: 6.5vw;
    }
  }
`

const ErrorMessage = styled.span`
  color: #777;
  font-style: italic;
`

const ErrorBody = styled.div`
  background: #081421;
  height: 100vh;
  color: #d3d7de;
  font-family: "Courier new";
  font-size: 18px;
  line-height: 1.5em;
  cursor: default;

  a {
    color: #fff;
  }
`

const Error = () => (
  <ErrorBody>
    <CodeArea>
      <ErrorMessage>
        /* Preview not found. Check console in editor - something probably
        crashed! */
      </ErrorMessage>
      <span>
        <span style={{ color: "#d65562" }}>if</span>
        <span style={{ color: "#bdbdbd" }}> (</span>
        <span style={{ color: "#4ca8ef" }}>!</span>
        <span style={{ fontStyle: "italic", color: "#bdbdbd" }}>found)</span>
      </span>
      <span>
        <span style={{ paddingLeft: "15px", color: "#2796ec" }}>
          <i style={{ width: "10px", display: "inline-block" }} />
          throw
        </span>
        <span>
          (<span style={{ color: "#a6a61f" }}>"(╯°□°)╯︵ ┻━┻"</span>)
        </span>
        <span style={{ display: "block" }}>{"}"}</span>

        <Link
          to="/editor"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <span style={{ color: "#777", fontStyle: "italic" }}>
            // Go back!
          </span>
        </Link>
      </span>
    </CodeArea>
  </ErrorBody>
)

const getProjectPort = () => "17196"

const getMachineId = () => "5d0ba955d0027b3e519b4c39"

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
  const dispatch = useDispatch()

  const token = useSelector(getToken)
  const id = useSelector(getId)
  const port = useSelector(getPort)
  // const [previewOn, setPreviewOn] = useState(true)

  // useEffect(() => {
  //   const isIframeReachable = async () => {
  //     const isPreviewOn = await fetch(
  //       `https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/isPreviewOn?token=${testToken}`
  //     ).then(res => res.json())

  //     setPreviewOn(isPreviewOn.result)
  //   }

  //   isIframeReachable()
  // }, [])

  return (
    <>
      <SEO title="Preview" />
      <StyledIframe
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${token},id=${id},port=${port}`}
      />
    </>
  )
}

export default Preview
