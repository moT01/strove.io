import React, { useRef, useEffect, useState } from "react"
// import { Link } from "gatsby"
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

const Error = `
<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>No preview yet :/</title>
    <meta name="description" content="No preview">
    <meta name="author" content="Silisky">
    <link rel="stylesheet" href="./index.css">
    <style>
      body {
        background: #081421;
        color: #d3d7de;
        font-family: "Courier new";
        font-size: 18px;
        line-height: 1.5em;
      cursor: default;
      }
      a {
        color: #fff;
      }

      .code-area {
          position: absolute;
         width: 320px;
        min-width: 320px;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
      }

      .code-area > span {
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
    </style>
  </head>
  <body>
    <div class="code-area">
        <span style="color: #777;font-style:italic;">
          /* Preview not found. Check console in editor - something probably crashed! */
        </span>
        <span>
          <span style="color:#d65562;">
            if
          </span>
          (<span style="color:#4ca8ef;">!</span><span style="font-style: italic;color:#bdbdbd;">found</span>)
          {
        </span>
        <span>
          <span style="padding-left: 15px;color:#2796ec">
            <i style="width: 10px;display:inline-block"></i>throw
          </span>
          <span>
            (<span style="color: #a6a61f">"(╯°□°)╯︵ ┻━┻"</span>);
          </span>
          <span style="display:block">}</span>
          <span style="color: #777;font-style:italic;">
            // <a href="http://localhost:8000/editor">Go back!</a>
          </span>
        </span>
      </div>
  </body>
</html>
`

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
        <div>Sorry</div>
      ) : (
        <StyledIframe
          // ref={ref}
          src={`<div>Preview</div>`}
        />
      )}
    </>
  )
}

export default Preview
