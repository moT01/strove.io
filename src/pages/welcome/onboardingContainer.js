import React from 'react'

import { isMobile } from 'react-device-detect'

import { FullScreenWrapper } from 'components'

import { Illustration, WelcomeWrapper, SectionWrapper } from './styled'

const OnboardingContainer = ({ children }) => {
  return (
    <FullScreenWrapper>
      <WelcomeWrapper>
        <SectionWrapper>{children}</SectionWrapper>
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

/*
  Memoize this component will only add additional overhead
  https://twitter.com/aweary/status/1230594484347396097
*/
export default OnboardingContainer
