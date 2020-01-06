import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { loginOptions } from 'consts'
import { ExternalLink, PoweredBy } from 'components'
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

const LoginInfoWrapper = styled.div`
  font-size: 16px;
  text-align: center;
  width: 300px;
`

const Wrapper = styled.div`
  display: flex;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
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
    <Wrapper>
      <MenuWrapper invert>
        {loginProvider ? (
          <>
            <ExternalLink
              primary
              href={`${loginProvider.href}?goBackTo=${goBackTo}&repoUrl=${repoUrl}`}
            >
              {loginProvider.icon}
              <LoginText invert>Login with {loginProvider.label}</LoginText>
            </ExternalLink>
            <LoginInfoWrapper>
              This window will close after login
            </LoginInfoWrapper>
            <PoweredBy />
          </>
        ) : (
          <LoginInfoWrapper>
            Loggin in...
            <PoweredBy />
          </LoginInfoWrapper>
        )}
      </MenuWrapper>
    </Wrapper>
  )
}

export default memo(Login)
