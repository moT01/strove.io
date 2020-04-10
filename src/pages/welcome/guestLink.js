import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { selectors } from 'state'
import { getWindowSearchParams } from 'utils'
import { actions } from 'state'
import { StroveButton } from 'components'

import OnboardingContainer from './onboardingContainer'
import { Title, Details } from './styled'

const FromEmailInvitation = () => {
  const searchParams = getWindowSearchParams()
  const token = useSelector(selectors.getToken)
  const dispatch = useDispatch()
  const isGuest = window.location.href.includes('guestLink') && !token
  console.log('TCL: FromEmailInvitation -> token', token)
  console.log(
    "TCL: FromEmailInvitation -> window.location.href.toLowerCase().includes('guestLink')",
    window.location.href.toLowerCase().includes('guestLink')
  )
  const guestId = searchParams.get('id')
  console.log('TCL: FromEmailInvitation -> guestId', guestId)
  console.log('TCL: FromEmailInvitation -> isGuest', isGuest)

  useEffect(() => {
    if (isGuest) {
      dispatch(actions.guestInvitation.addGuestInvitation({ isGuest, guestId }))
    }
  }, [isGuest])

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
        />
      </>
    </OnboardingContainer>
  )
}

export default memo(FromEmailInvitation)
