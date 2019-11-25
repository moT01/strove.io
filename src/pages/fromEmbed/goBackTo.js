import React, { memo } from 'react'
// import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { ThemeProvider } from 'styled-components'

import { theme } from 'constants'
import {
  GlobalStyles,
  NoRepoUrlInfo,
  PoweredBy,
  ExternalLink,
} from 'components'
import { selectors } from 'state'
import { getWindowSearchParams } from 'utils'

const getToken = selectors.api.getUserField('siliskyToken')

const MenuWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
  z-index: 3;
  position: relative;
`

const Wrapper = styled.div`
  display: flex;
  height: 97vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GoBackTo = () => {
  const token = useSelector(getToken)

  const searchParams = getWindowSearchParams()
  const repoUrl = searchParams.get('url')

  // if (token && repoUrl) {
  //   // If user is logged in, redirect to the embed project run
  //   navigate(`/embed/runProject/?repoUrl=${repoUrl}`)
  // }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MenuWrapper invert>...redirecting</MenuWrapper>
      </Wrapper>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default memo(GoBackTo)
