import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'

import { InviteMembersForm } from 'components'
import { selectors } from 'state'

import OnboardingContainer from './onboardingContainer'
import { Title, SkipForNow } from './styled'

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TeamMembers = ({ history }) => {
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()

  return (
    <OnboardingContainer>
      <>
        <Title>Who else is working on your team?</Title>
        <InviteMembersForm />
        <SkipForNow onClick={() => history.push('/welcome/helloThere')}>
          Skip for now
        </SkipForNow>
      </>
    </OnboardingContainer>
  )
}

export default memo(withRouter(TeamMembers))
