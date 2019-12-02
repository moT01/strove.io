import React, { memo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'

import { theme } from 'constants'
import { GlobalStyles } from 'components'
import { getWindowSearchParams } from 'utils'
import { selectors } from 'state'

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
  const token = useSelector(selectors.api.getUser)?.siliskyToken
  const searchParams = getWindowSearchParams()
  const goBackTo = searchParams.get('goBackTo')

  console.log('goBackTo', goBackTo, 'token', token)

  /* Redirect logged in users */
  if (goBackTo && token) {
    window.location.replace(goBackTo)
  }

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
