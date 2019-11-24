import React, { memo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import { theme } from 'constants'
import { loginOptions } from 'constants'
import {
  StroveButton,
  GlobalStyles,
  NoRepoUrlInfo,
  ExternalLink,
} from 'components'
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

const RedirectInfoWrapper = styled.div`
  font-size: 16px;
  text-align: center;
  width: 300px;
`

const Url = styled.span`
  font-style: italic;
  font-weight: 600;
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
  margin-bottom: 8px;
  > svg {
    fill: ${({ theme }) => theme.colors.c2};
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
`

const NoRedirectUrlInfo = styled.div`
  font-size: 18px;
  text-align: center;
  font-style: italic;
  margin-top: 10px;
`

const Login = () => {
  const searchParams = getWindowSearchParams()
  const repoUrl = searchParams.get('repoUrl')
  const redirectTo = searchParams.get('redirectTo')
  const repoProvider = getRepoProvider(repoUrl)
  const loginProvider = loginOptions.find(
    option => option.value === repoProvider
  )

  console.log('redirectTo', redirectTo)

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MenuWrapper invert>
          {loginProvider ? (
            <div>
              <ExternalLink
                primary
                href={loginProvider.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {loginProvider.icon}
                <LoginText invert>Login with {loginProvider.label}</LoginText>
              </ExternalLink>
              {redirectTo ? (
                <RedirectInfoWrapper>
                  You'll be redirected back to <Url>{redirectTo}</Url> once you
                  log in!
                </RedirectInfoWrapper>
              ) : (
                <NoRedirectUrlInfo>
                  Ops! No redirect link available!
                </NoRedirectUrlInfo>
              )}
            </div>
          ) : (
            <NoRepoUrlInfo />
          )}
        </MenuWrapper>
      </Wrapper>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default memo(Login)
