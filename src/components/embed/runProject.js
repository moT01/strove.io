import React, { memo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import { theme } from 'constants'
import { StroveButton, AddProjectProvider } from 'components'

import GlobalStyles from '../globalStyles'

const MenuWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
  z-index: 3;
  position: relative;
`

const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

const Wrapper = styled.div`
  display: flex;
  height: 97vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled(StroveButton)`
  height: 60px;
  width: 300px;
  > svg {
    fill: ${({ theme }) => theme.colors.c2};
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
`

const Run = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MenuWrapper invert>
          <StyledButton isPrimary>
            <LoginText invert>Run with Strove</LoginText>
          </StyledButton>
        </MenuWrapper>
      </Wrapper>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default memo(() => (
  <AddProjectProvider>
    {({ addProject }) => <Run addProject={addProject} />}
  </AddProjectProvider>
))
