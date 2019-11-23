import React, { memo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import { theme } from 'constants'
import { loginOptions } from 'constants'
import { StroveButton, GlobalStyles } from 'components'
import { getRepoProvider, getWindowSearchParams } from 'utils'

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

const Login = () => {
  const repoUrl = getWindowSearchParams()?.get('repoUrl')
  const repoProvider = getRepoProvider(repoUrl)
  const loginProvider = loginOptions.find(
    option => option.value === repoProvider
  )

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MenuWrapper invert>
          {loginProvider ? (
            <StyledButton isPrimary key={loginProvider.label}>
              {loginProvider.icon}
              <LoginText invert>Login with {loginProvider.label}</LoginText>
            </StyledButton>
          ) : (
            <h3>
              Please provide repoUrl. Example:{' '}
              <i>
                https://strove.io/embed/?repoUrl=https://github.com/validatorjs/validator.js
              </i>
            </h3>
          )}
        </MenuWrapper>
      </Wrapper>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default memo(Login)
