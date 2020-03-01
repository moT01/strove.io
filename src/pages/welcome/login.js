import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { ExternalLink } from 'components'
import { selectors } from 'state'
import { loginOptions } from 'consts'

import OnboardingContainer from './onboardingContainer'
import { LoginText, LoginTitle, InvitationDetails } from './styled'

const Login = () => {
  const token = useSelector(selectors.getToken)

  if (token) {
    return <Redirect to="/app/dashboard" />
  }

  return (
    <OnboardingContainer>
      <>
        <LoginTitle>First, login with Gitub or Gitlab</LoginTitle>
        <InvitationDetails>
          Just a quick login before you say goodbye to long environment setups
          for good.
        </InvitationDetails>
        {loginOptions.map(loginOption => (
          <ExternalLink
            key={loginOption.label}
            primary
            href={`${loginOption.href}`}
            width="100%"
          >
            {loginOption.icon}
            <LoginText invert>Login with {loginOption.label}</LoginText>
          </ExternalLink>
        ))}
      </>
    </OnboardingContainer>
  )
}

export default memo(Login)
