import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { Prompt } from 'react-router-dom'

import { selectors } from 'state'

import LoadingEditorInfo from './loadingEditorInfo'

const StyledIframe = styled.iframe`
  display: block;
  background: ${({ theme }) => theme.colors.c3};
  border: none;
  min-height: calc(100vh - 20px);
  width: 100vw;
  margin: 0;
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
`

const Editor = ({ projectId, machineName, port, onLoad, isEmbed, teamId }) => {
  const token = useSelector(selectors.getToken)
  const randomId = Math.random()
    .toString(36)
    .substring(7)

  return (
    <>
      <Prompt
        message={() =>
          `Are you sure you want to leave editor? This will stop your running processes.`
        }
      />
      <LoadingEditorInfo />
      <StyledIframe
        isEmbed={isEmbed}
        onLoad={onLoad}
        src={`${process.env.REACT_APP_STROVE_URL}vm/${machineName}/${port}/?r=${randomId}&folder=/home/strove/project&token=Bearer ${token}&projectId=${projectId}&teamId=${teamId}`}
      />
    </>
  )
}

export default memo(Editor)
