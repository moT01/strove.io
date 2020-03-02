import React from 'react'

import { isMobile } from 'react-device-detect'

import { FullScreenWrapper } from 'components'

import { Illustration, WelcomeWrapper, SectionWrapper, ImageContainer } from './styled'

const OnboardingContainer = ({ children }) => {
  return (
    <FullScreenWrapper>
      <WelcomeWrapper>
        <SectionWrapper>{children}</SectionWrapper>
        {!isMobile && (
          <ImageContainer>
            <Illustration
              src={require('assets/illustration.png')}
              alt="illustration"
            />
          </ImageContainer>
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
