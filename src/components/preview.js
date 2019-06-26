import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { Location } from '@reach/router'

import { projectSelectors, selectors } from 'state'
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

const getSelectedProject = projectSelectors.getProjectData

const Preview = () => {
  const token = useSelector(getToken)
  const project = useSelector(getSelectedProject)
  const id = project.machineId
  const port = project.previewPort
  console.log('TCL: Preview -> id', id)
  console.log('TCL: Preview -> port', port)
  console.log('TCL: PreviewComponent -> project', project)
  console.log(
    `https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${token}&id=${id}&port=${port}`
  )

  return (
    <>
      <SEO title="Preview" />
      <StyledIframe
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${token}&id=${id}&port=${port}`}
      />
    </>
  )
}

// const Preview = ({ children, ...props }) => (
//   <Location>
//     {({ location }) => (
//       <PreviewComponent
//         {...props}
//         children={children}
//         location={location}
//       ></PreviewComponent>
//     )}
//   </Location>
// )

export default Preview
