import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { Location } from '@reach/router'

import { selectors } from 'state'
import SEO from 'components/seo'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
`

const getUserToken = selectors.getData('user', {}, 'siliskyToken')

const getToken = createSelector(
  [getUserToken],
  token => token
)

const PreviewComponent = ({ location }) => {
  const token = useSelector(getToken)
  const id = location.state.machineId
  const port = location.state.editorPort

  return (
    <>
      <SEO title="Preview" />
      <StyledIframe
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${token}&id=${id}&port=${port}`}
      />
    </>
  )
}

const Preview = ({ children, ...props }) => (
  <Location>
    {({ location }) => (
      <PreviewComponent
        {...props}
        children={children}
        location={location}
      ></PreviewComponent>
    )}
  </Location>
)

export default Preview
