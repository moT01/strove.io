import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'

import { ExternalLink } from 'components'
import { selectors } from 'state'
import { getWindowSearchParams } from 'utils'
import { loginOptions } from 'consts'

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
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const InvitationTitle = styled.div`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 20px;
`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InvitationDetails = styled.div`
  color: ${({ theme }) => theme.colors.c11};
  font-size: 18px;
  margin: 10px;
`

const FromEmailInvitation = () => {
  const searchParams = getWindowSearchParams()
  const token = useSelector(selectors.getToken)

  const teamName = searchParams.get('teamName')
  const invitedEmail = searchParams.get('invitedEmail')
  const fromEmail = searchParams.get('fromEmail')

  if (token) {
    return <Redirect to="/app/dashboard" />
  }

  return (
    <Wrapper>
      <MenuWrapper invert>
        <InvitationTitle>
          You're invited to <b>{teamName}</b>
        </InvitationTitle>
        <InvitationDetails>
          {fromEmail} has invited you to join the Strove team <b>{teamName}</b>.
          Login to start collaborating!
        </InvitationDetails>
        <LoginWrapper>
          {loginOptions.map(loginOption => (
            <ExternalLink primary href={`${loginOption.href}`}>
              {loginOption.icon}
              <LoginText invert>Login with {loginOption.label}</LoginText>
            </ExternalLink>
          ))}
        </LoginWrapper>
        <InvitationDetails>
          Your sign email is <b>{invitedEmail}</b>
        </InvitationDetails>
      </MenuWrapper>
    </Wrapper>
  )
}

export default memo(FromEmailInvitation)
