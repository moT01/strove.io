import React, { useRef, useEffect, useState } from "react"
// import { Link } from "gatsby"
import styled from "styled-components"

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

const testToken = "testToken"

const Preview = () => {
  const iframe = useRef(null)

  const [ref] = useHookWithRefCallback()

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   iframe.contentDocument.body.innerHTML = fetch(
  //     "https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview"
  //   ).then(function(response) {
  //     // When the page is loaded convert it to text
  //     return response.text()
  //   })
  // })

  return (
    <>
      <SEO title="Preview" />
      <StyledIframe
        ref={iframe}
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${testToken}`}
      />
    </>
  )
}

export default Preview
