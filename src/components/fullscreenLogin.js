import React, { memo } from 'react'
import styled from 'styled-components'
import { createSelector } from 'reselect'
import { ThemeProvider } from 'styled-components'

import { theme } from 'constants'
import { selectors } from 'state'
import { loginOptions } from 'constants'
import { StroveButton } from 'components'

import GlobalStyles from './globalStyles'

const MenuWrapper = styled.div`
  padding: 20px;
  box-shadow: 0 1.2vh 1.2vh -1.5vh ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-style: solid;
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

const LoginDropdown = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MenuWrapper invert>
          {loginOptions.map(item => (
            <StyledButton isPrimary key={item.label}>
              {item.icon}
              <LoginText invert>{item.label}</LoginText>
            </StyledButton>
          ))}
        </MenuWrapper>
      </Wrapper>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default memo(LoginDropdown)
