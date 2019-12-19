import React, { memo } from 'react'
import styled from 'styled-components/macro'

const StyledIframe = styled.iframe`
  display: block;
  background: ${({ theme }) => theme.colors.c3};
  border: none;
  min-height: ${props => (props.isEmbed ? 'calc(100vh - 20px)' : '97vh')};
  width: 100vw;
  margin: 0;
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
`

const Editor = ({ token, machineId, port, onLoad, isEmbed, loaderVisible }) => {
  const randomId = Math.random()
    .toString(36)
    .substring(7)

  return (
    <StyledIframe
      isEmbed={isEmbed}
      loaderVisible={loaderVisible}
      onLoad={onLoad}
      src={`${process.env.REACT_APP_STROVE_ENDPOINT}/editor?token=${token}&id=${machineId}&port=${port}&r=${randomId}`}
    />
  )
}

export default memo(Editor)
