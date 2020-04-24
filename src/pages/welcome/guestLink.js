import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { selectors } from 'state'
import { getWindowSearchParams, mutation } from 'utils'
import { actions } from 'state'
import { StroveButton } from 'components'

import { GUEST_LOGIN } from 'queries'

import OnboardingContainer from './onboardingContainer'
import { Title, Details } from './styled'

const FromEmailInvitation = ({ history }) => {
  const searchParams = getWindowSearchParams()
  const token = useSelector(selectors.getToken)
  const dispatch = useDispatch()
  const isGuest = window.location.href.includes('guestLink') && !token

  const deviceId = localStorage.getItem('deviceId')
  const guestId = searchParams.get('id')

  useEffect(() => {
    if (isGuest) {
      dispatch(actions.guestInvitation.addGuestInvitation({ isGuest, guestId }))
    }
    //eslint-disable-next-line
  }, [isGuest])

  const handleClick = () => {
    dispatch(
      mutation({
        name: 'guestLogin',
        mutation: GUEST_LOGIN,
        context: null,
        onSuccess: () => history.push('/app/dashboard'),
        variables: {
          deviceId,
          guestId,
        },
      })
    )
  }

  return (
    <OnboardingContainer>
      <>
        <div>
          <Title>Hello there!</Title>
          <Details>You are accessing Strove as a guest.</Details>
          <Details>
            We will redirect you to the Dashboard where you will be able to test
            out Strove features.
          </Details>
        </div>
        <StroveButton
          margin="20px 0"
          isPrimary
          isGetStarted
          navigateTo="/app/dashboard"
          text="Go to dashboard"
          onClick={handleClick}
        />
      </>
    </OnboardingContainer>
  )
}

export default memo(FromEmailInvitation)
