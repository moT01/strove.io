import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { ExternalLink, FullScreenWrapper, MenuWrapper } from 'components'
import { selectors } from 'state'
import { getWindowSearchParams } from 'utils'
import { loginOptions } from 'consts'
import { actions } from 'state'

import {
  LoginText,
  InvitationTitle,
  LoginWrapper,
  InvitationDetails,
  Illustration,
} from './styled'

const Login = () => {
  const searchParams = getWindowSearchParams()
  const token = useSelector(selectors.getToken)
  const dispatch = useDispatch()

  //   const teamName = searchParams.get('teamName')
  //   const teamId = searchParams.get('teamId')
  //   const invitedEmail = searchParams.get('invitedEmail')
  //   const fromEmail = searchParams.get('fromEmail')

  if (token) {
    return <Redirect to="/app/dashboard" />
  }

  return (
    <FullScreenWrapper>
      <MenuWrapper>
        <InvitationTitle>
          Login or signup with one of the supported source control providers
        </InvitationTitle>
        <LoginWrapper>
          {loginOptions.map(loginOption => (
            <ExternalLink
              key={loginOption.label}
              primary
              href={`${loginOption.href}`}
              onClick={() => {}}
            >
              {loginOption.icon}
              <LoginText invert>Login with {loginOption.label}</LoginText>
            </ExternalLink>
          ))}
        </LoginWrapper>
      </MenuWrapper>
      {!isMobile && (
        <Illustration
          src={require('assets/illustration.png')}
          alt="illustration"
        />
      )}
    </FullScreenWrapper>
  )
}

export default memo(Login)
