import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { selectors } from 'state'

const StyledIframe = styled.iframe`
  display: block;
  background: ${({ theme }) => theme.colors.c3};
  border: none;
  min-height: calc(100vh - 20px);
  width: 100vw;
  margin: 0;
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
`

const getUserToken = selectors.api.getApiData({
  fields: ['user', 'siliskyToken'],
  defaultValue: null,
})

const Editor = ({ machineName, port, onLoad, isEmbed, loaderVisible }) => {
  // const iframe = useRef()
  const [editorContent, setEditorContent] = useState('')
  const token = useSelector(getUserToken)
  const randomId = Math.random()
    .toString(36)
    .substring(7)

  useEffect(() => {
    if (token) {
      const handler = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // this.response is a Blob, because we set responseType above
          const dataUrl = URL.createObjectURL(xhr.response)
          console.log('dataUrl', dataUrl)
          setEditorContent(dataUrl)
        } else {
          console.error('Something went wrong')
        }
      }

      /* This doesnt work due to missing Access-Control-Allow-Origin somewhere in proxy */
      const xhr = new XMLHttpRequest()
      const token = `Bearer ${token}`
      const src = `${process.env.REACT_APP_STROVE_URL}vm/${machineName}/${port}/?r=${randomId}&folder=/home/strove/project&token=${token}`
      xhr.open('GET', src)
      xhr.onreadystatechange = handler
      xhr.responseType = 'blob'
      xhr.send()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  console.log('editorContent', editorContent)

  return editorContent ? (
    <StyledIframe
      isEmbed={isEmbed}
      loaderVisible={loaderVisible}
      onLoad={onLoad}
      src={editorContent}
    />
  ) : (
    loaderVisible
  )
}

export default memo(Editor)
