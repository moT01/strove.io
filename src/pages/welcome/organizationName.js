import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ExternalLink } from 'components'
import { selectors } from 'state'
import { loginOptions } from 'consts'
import { actions } from 'state'

import OnboardingContainer from './onboardingContainer'
import {
  LoginText,
  InvitationTitle,
  LoginWrapper,
  InvitationDetails,
  FormWrapper,
} from './styled'

const OrganizationName = () => {
  return (
    <OnboardingContainer>
      <>
        <InvitationTitle>
          What's the name of your company or team?
        </InvitationTitle>
        <FormWrapper>
          <input></input>
        </FormWrapper>
      </>
    </OnboardingContainer>
  )
}

export default memo(OrganizationName)
