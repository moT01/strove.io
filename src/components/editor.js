import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import Layout from 'components/layout'
import { Location } from '@reach/router'

import { selectors } from 'state'
import SEO from 'components/seo'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 93vh;
  width: 100vw;
  margin: 0;
`

const getUserToken = selectors.getData('user', {}, 'siliskyToken')

// const getProjectPort = () => '23648'

// const getMachineId = () => '5d0e233ef9265ebc230bae22'

const getToken = createSelector(
  [getUserToken],
  token => token
)

// const getId = createSelector(
//   [getMachineId],
//   machineId => machineId
// )

// const getPort = createSelector(
//   [getProjectPort],
//   port => port
// )

const EditorComponent = ({ location }) => {
  console.log('TCL: Editor -> location', location)
  const token = useSelector(getToken)
  const id = location.state.machineId
  console.log('TCL: EditorComponent -> id', id)
  const port = location.state.editorPort
  console.log('TCL: EditorComponent -> port', port)

  return (
    <Layout>
      <SEO title="Editor" />
      <StyledIframe
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/editor?token=${token}&id=${id}&port=${port}`}
      />
    </Layout>
  )
}

const Editor = ({ children, ...props }) => (
  <Location>
    {({ location }) => (
      <EditorComponent
        {...props}
        location={location}
        children={children}
      ></EditorComponent>
    )}
  </Location>
)

export default Editor
