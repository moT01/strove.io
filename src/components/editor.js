import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Location } from '@reach/router'
import getOr from 'lodash/fp/getOr'

import Layout from 'components/layout'
import Loader from 'components/fullScreenLoader.js'
import { STOP_PROJECT } from 'queries'
import { selectors } from 'state'
import SEO from 'components/seo'
import { mutation } from 'utils'
import * as C from 'state/currentProject/constants'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 95vh;
  width: 100vw;
  margin: 0;
`

const getUserToken = selectors.getData('user', {}, 'siliskyToken')
const getId = getOr(undefined, ['currentProject', 'id'])
const getMachineId = getOr(undefined, ['currentProject', 'machineId'])
const getPort = getOr(undefined, ['currentProject', 'editorPort'])

const EditorComponent = ({ location }) => {
  const dispatch = useDispatch()
  const token = useSelector(getUserToken)
  const projectId = useSelector(getId)
  const machineId = useSelector(getMachineId)
  const port = useSelector(getPort)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    // window.addEventListener('beforeunload', ev => {
    //   dispatch(
    //     mutation({
    //       name: 'stopProject',
    //       mutation: STOP_PROJECT,
    //       variables: { projectId: id, machineId: id },
    //       onSuccessDispatch: [
    //         () => ({
    //           type: C.STOP_PROJECT,
    //         }),
    //       ],
    //     })
    //   )
    //   // ev.preventDefault()
    //   // return (ev.returnValue = 'Are you sure you want to close?')
    // })

    const stop = () =>
      dispatch(
        mutation({
          name: 'stopProject',
          storeKey: 'stopProject',
          mutation: STOP_PROJECT,
          dataSelector: data => data,
          variables: { projectId, machineId },
          onSuccessDispatch: [
            () => ({
              type: C.STOP_PROJECT,
            }),
          ],
        })
      )

    stop()
  }, [])

  return (
    <Layout>
      <SEO title="Editor" />
      {loaderVisible && <Loader isFullScreen={true} color="#0072ce" />}
      <StyledIframe
        onLoad={() => setLoaderVisible(false)}
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/editor?token=${token}&id=${projectId}&port=${port}`}
        style={{ opacity: loaderVisible ? 0 : 1 }}
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
