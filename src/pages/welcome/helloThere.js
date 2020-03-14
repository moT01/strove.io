import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { SET_ONBOARDED, ME } from 'queries'
import { StroveButton } from 'components'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, Details } from './styled'

const HelloThere = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      mutation({
        name: 'setOnboarded',
        mutation: SET_ONBOARDED,
        variables: {
          isOnboarded: true,
        },
        onSuccessDispatch: () =>
          mutation({
            name: 'me',
            mutation: ME,
            storeKey: 'user',
          }),
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <OnboardingContainer>
      <>
        <div>
          <Title>Hello there!</Title>
          <Details>
            Now you're ready to use Strove - a cloud alternative to local
            software development.
          </Details>
          <Details>
            We will redirect you to your Dashboard. It brings together people
            and projects so your team can move forward and get things done.
          </Details>
        </div>
        <StroveButton
          margin="20px 0"
          isPrimary
          isGetStarted
          navigateTo="/app/dashboard"
          text="See your Dashboard in Strove"
        />
      </>
    </OnboardingContainer>
  )
}

export default memo(HelloThere)
