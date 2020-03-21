import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'

import { InviteMembersForm } from 'components'

import OnboardingContainer from './onboardingContainer'
import { Title, SkipForNow } from './styled'

const TeamMembers = ({ history }) => {
  return (
    <OnboardingContainer>
      <Title>Who else is working on your team?</Title>
      <InviteMembersForm />
      <SkipForNow onClick={() => history.push('/welcome/helloThere')}>
        Skip for now
      </SkipForNow>
    </OnboardingContainer>
  )
}

export default memo(withRouter(TeamMembers))
