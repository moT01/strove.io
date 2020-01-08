import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

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
  display: flex;
  align-items: center;
  justify-content: center;
`

const GoBackTo = () => {
  const token = useSelector(selectors.api.getUser)?.siliskyToken
  const searchParams = getWindowSearchParams()
  const goBackTo = searchParams.get('goBackTo')

  if (goBackTo && token) {
    /*
      Redirect logged in users
      Redirect should only happen once logged in state is saved to localStorage.
      ToDo: Find a better way to do this. One of the ways includes reacting to storage events:
      https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent
    */
    setTimeout(() => window.location.replace(goBackTo), 1000)
  }

  return (
    <Wrapper>
      <MenuWrapper invert>...redirecting</MenuWrapper>
    </Wrapper>
  )
}

export default memo(GoBackTo)
