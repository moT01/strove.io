import React, { useState, memo } from 'react'

import { isMobile } from 'react-device-detect'

import { FullScreenWrapper } from 'components'

import {
  Illustration,
  WelcomeWrapper,
  SectionWrapper,
  ImageContainer,
} from './styled'

const OnboardingContainer = ({ children }) => {
  const [isImageLoaded, setImageLoading] = useState(false)
  return (
    <FullScreenWrapper>
      {isImageLoaded && <SectionWrapper>{children}</SectionWrapper>}
      <WelcomeWrapper>
        {!isMobile && (
          <ImageContainer>
            <Illustration
              decoding="async"
              onLoad={() => setImageLoading(true)}
              src={require('assets/illustration.png')}
              alt="illustration"
            />
          </ImageContainer>
        )}
      </WelcomeWrapper>
    </FullScreenWrapper>
  )
}

export default memo(OnboardingContainer)
