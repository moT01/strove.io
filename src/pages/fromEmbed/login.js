import React, { memo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import { theme } from 'constants'
import { loginOptions } from 'constants'
import { GlobalStyles, NoRepoUrlInfo, ExternalLink } from 'components'
import { getRepoProvider, getWindowSearchParams, getDomain } from 'utils'

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

const NoRedirectUrlInfo = styled.div`
  font-size: 18px;
  text-align: center;
  font-style: italic;
  margin-top: 10px;
`

const Login = () => {
  const searchParams = getWindowSearchParams()
  const repoUrl = searchParams.get('repoUrl')
  const goBackTo = searchParams.get('goBackTo')
  const repoProvider = getRepoProvider(repoUrl)
  const loginProvider = loginOptions.find(
    option => option.value === repoProvider
  )

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MenuWrapper invert>
          {loginProvider ? (
            <>
              <ExternalLink
                primary
                href={`${loginProvider.embedHref}?goBackTo=${goBackTo}&repoUrl=${repoUrl}`}
              >
                {loginProvider.icon}
                <LoginText invert>Login with {loginProvider.label}</LoginText>
              </ExternalLink>
              {goBackTo ? (
                <RedirectInfoWrapper>
                  You'll be redirected back to <Url>{getDomain(goBackTo)}</Url>{' '}
                  once you log in
                </RedirectInfoWrapper>
              ) : (
                <NoRedirectUrlInfo>
                  Ops! No redirect link available!
                </NoRedirectUrlInfo>
              )}
            </>
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
