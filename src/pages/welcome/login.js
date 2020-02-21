import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { ExternalLink, FullScreenWrapper } from 'components'
import { selectors } from 'state'
import { loginOptions } from 'consts'

import {
  LoginText,
  LoginTitle,
  LoginWrapper,
  InvitationDetails,
  Illustration,
  WelcomeWrapper,
  SectionWrapper,
} from './styled'

const Login = () => {
  const token = useSelector(selectors.getToken)

  if (token) {
    return <Redirect to="/app/dashboard" />
  }

  return (
    <FullScreenWrapper>
      <WelcomeWrapper>
        <SectionWrapper>
          <LoginTitle>First, login with Gitub or Gitlab</LoginTitle>
          <InvitationDetails>
            Just a quick login before you say goodbye to long environment setups
            for good.
          </InvitationDetails>
          <LoginWrapper>
            {loginOptions.map(loginOption => (
              <ExternalLink
                key={loginOption.label}
                primary
                href={`${loginOption.href}`}
              >
                {loginOption.icon}
                <LoginText invert>Login with {loginOption.label}</LoginText>
              </ExternalLink>
            ))}
          </LoginWrapper>
        </SectionWrapper>
        {!isMobile && (
          <Illustration
            src={require('assets/illustration.png')}
            alt="illustration"
          />
        )}
      </WelcomeWrapper>
    </FullScreenWrapper>
  )
}

export default memo(Login)
