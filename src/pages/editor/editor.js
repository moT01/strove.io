import React, { memo, useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'

const StyledIframe = styled.iframe`
  display: block;
  background: ${({ theme }) => theme.colors.c3};
  border: none;
  min-height: calc(100vh - 20px);
  width: 100vw;
  margin: 0;
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
`

const Editor = ({ machineName, port, onLoad, isEmbed, loaderVisible }) => {
  const iframe = useRef()

  const randomId = Math.random()
    .toString(36)
    .substring(7)

  const handler = () => {
    if (this.readyState === this.DONE) {
      if (this.status === 200) {
        // this.response is a Blob, because we set responseType above
        const dataUrl = URL.createObjectURL(this.response)
        iframe.src = dataUrl
      } else {
        console.error('Something went wrong')
      }
    }
  }

  useEffect(() => {
    if (iframe) {
      const xhr = new XMLHttpRequest()
      const src = `${process.env.REACT_APP_STROVE_URL}/vm/${machineName}/${port}/?r=${randomId}&folder=/home/strove/project`
      xhr.open('GET', src)
      xhr.onreadystatechange = handler
      xhr.responseType = 'blob'
      xhr.setRequestHeader('Authorization', 'Bearer ' + token)
      xhr.send()
    }
  }, [iframe])

  return (
    <StyledIframe
      ref={iframe}
      isEmbed={isEmbed}
      loaderVisible={loaderVisible}
      onLoad={onLoad}
      src={`${process.env.REACT_APP_STROVE_URL}/vm/${machineName}/${port}/?r=${randomId}&folder=/home/strove/project`}
    />
  )
}

export default memo(Editor)
