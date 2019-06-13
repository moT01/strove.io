import React, { useRef, useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import isReachable from "is-reachable"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
`

function useHookWithRefCallback() {
  const [node, setRef] = useState(null)

  useEffect(() => {
    if (node) {
      // Your Hook now has a reference to the ref element.
    }
  }, [node])

  return [setRef]
}

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
          <span style={{ color: "#a6a61f" }}>"(╯°□°)╯︵ ┻━┻"</span>
        </span>
        <span style={{ display: "block" }}>{"}"}</span>
        //
        <Link
          to="/preview"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <span style={{ color: "#777", fontStyle: "italic" }}> Go back!</span>
        </Link>
      </span>
    </CodeArea>
  </ErrorBody>
)

const testToken = "testToken"

const Preview = () => {
  const [previewOn, setPreviewOn] = useState(false)

  const isIframeReachable = async () => {
    const adress = "http://35.239.27.5:9991/"
    const reachable = await isReachable(adress)
    if (!reachable) {
      // setPreviewOn(false)
      // document.getElementsByTagName(
      //   "IFRAME"
      // )[0].contentDocument.body.innerHTML = Error

      return () => setPreviewOn(true)
    }
  }

  useEffect(() => isIframeReachable())

  // const [ref] = useHookWithRefCallback()

  // useEffect(async () => {
  //   // Update the document title using the browser API

  //   const adress = "http://35.239.27.5:9991/"
  //   const reachable = await isReachable(adress)
  //   if (!reachable) {
  //     setTimeout(() => (ref.contentDocument.body.innerHTML = Error), 3000)
  //   }
  //   // iframe.contentDocument.body.innerHTML = fetch(
  //   //   "https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview"
  //   // ).then(function(response) {
  //   //   // When the page is loaded convert it to text
  //   //   return response.text()
  //   // })
  // })

  return (
    <>
      {console.log("previewOn", previewOn)}
      <SEO title="Preview" />
      {!previewOn ? (
        <Error />
      ) : (
        // <div>Sorry</div>
        <StyledIframe
          // ref={ref}
          src={`<div>Preview</div>`}
        />
      )}
    </>
  )
}

export default Preview
