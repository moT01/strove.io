import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { InviteMembersForm } from 'components'

import OnboardingContainer from './onboardingContainer'
import { Title, SkipForNow } from './styled'
import { actions, selectors } from 'state'

const TeamMembers = ({ history }) => {
  const dispatch = useDispatch()
  const ownedOrganizations = useSelector(selectors.api.getOwnedOrganizations)
  dispatch(
    actions.editedOrganization.setEditedOrganization({
      organization: ownedOrganizations[0],
      team: ownedOrganizations[0].teams[0],
    })
  )
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
