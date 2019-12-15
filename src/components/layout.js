import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import DetectBrowser from 'react-detect-browser'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components/macro'

import { AddProjectProvider, WithAddProject, DataManager } from 'components'
import { selectors } from 'state'
import Modal from './modal'
import GlobalStyles from './globalStyles'
import { theme } from 'consts'

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  max-width: 100vw;
  padding-top: 0;
`

const StyledModal = styled(Modal)`
  width: ${props => (props.isMobile ? '70vw' : '30vw')};
`

const Layout = ({ children, browser }) => {
  const [noSupportModalVisible, setNoSupportModalVisible] = useState(false)
  const user = useSelector(selectors.api.getUser)

  useEffect(() => {
    if (
      browser &&
      browser.name !== 'chrome' &&
      browser.name !== 'firefox' &&
      browser.name !== 'opera' &&
      browser.name !== 'safari'
    ) {
      setNoSupportModalVisible(true)
    }
  }, [browser])

  return (
    <ThemeProvider theme={theme}>
      <AddProjectProvider>
        {({ addProject }) => (
          <DataManager addProject={addProject}>
            <WithAddProject addProject={addProject}>
              {user ? (
                <StyledModal
                  isOpen={noSupportModalVisible}
                  onRequestClose={() => setNoSupportModalVisible(false)}
                  contentLabel="Browser not supported"
                  ariaHideApp={false}
                  isMobile={isMobile}
                >
                  {isMobile
                    ? 'You seem to be using a mobile device. This might not provide the best Strove.io user experience. We recommend using Strove.io on a computer.'
                    : 'Your browser might not provide the best Strove.io user experience. We recommend using Google Chrome, Mozilla Firefox, Safari or Opera.'}
                </StyledModal>
              ) : (
                ''
              )}
              <GlobalStyles />
              <MainContent>{children}</MainContent>
            </WithAddProject>
          </DataManager>
        )}
      </AddProjectProvider>
    </ThemeProvider>
  )
}

export default memo(({ children }) => (
  <DetectBrowser>
    {({ browser }) => <Layout browser={browser}>{children}</Layout>}
  </DetectBrowser>
))
