/* eslint-disable */
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { SET_ONBOARDED } from 'queries'
import { StroveButton } from 'components'
import { selectors } from 'state'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, SkipForNow, Details } from './styled'

const HelloThere = ({ history }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      mutation({
        name: 'setOnboarded',
        mutation: SET_ONBOARDED,
        variables: {
          isOnboarded: true,
        },
      })
    )
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
          type="submit"
          margin="20px 0 10px"
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
