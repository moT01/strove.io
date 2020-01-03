import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'

import { ExternalLink } from 'components'
import { selectors } from 'state'
import { getWindowSearchParams } from 'utils'
import { loginOptions } from 'consts'

const getToken = selectors.api.getUserField('siliskyToken')

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
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const InvitationTitle = styled.div`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 20px;
`

const FromEmailInvitaiton = () => {
  const searchParams = getWindowSearchParams()
  const token = useSelector(getToken)

  const teamName = searchParams.get('teamName')
  const invitedEmail = searchParams.get('invitedEmail')
  const fromEmail = searchParams.get('fromEmail')

  // if (token) {
  //   return <Redirect to="/app/dashboard" />
  // }

  return (
    <Wrapper>
      <MenuWrapper invert>
        <InvitationTitle>You're invited to {teamName}</InvitationTitle>
        {fromEmail} has invited you to join the Strove team <b>{teamName}</b>.
        Login to start collaborating!
        {loginOptions.map(loginOption => (
          <ExternalLink primary href={`${loginOption.href}`}>
            {loginOption.icon}
            <LoginText invert>Login with {loginOption.label}</LoginText>
          </ExternalLink>
        ))}
      </MenuWrapper>
    </Wrapper>
  )
}

export default memo(FromEmailInvitaiton)
