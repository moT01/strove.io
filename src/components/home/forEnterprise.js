import React, { memo } from 'react'
import { isMobile } from 'react-device-detect'

import { theme } from 'consts'

import {
  StyledSectionWrapper,
  StyledProductDescription,
  SectionDivider,
  StyledH3,
} from './styled'

const ForEnterprise = () => (
  <StyledSectionWrapper
    isSecondary
    background={theme.colors.c2}
    padding={`50px ${isMobile ? '20px' : '25%'} 0`}
  >
    <SectionDivider flexDirection="column">
      <StyledH3 color={theme.colors.c3}>Built for modern enterprise</StyledH3>
      <StyledProductDescription color={theme.colors.c26}>
        Strove helps businesses reduce management burden associated with
        creating software
      </StyledProductDescription>
    </SectionDivider>
  </StyledSectionWrapper>
)

export default memo(ForEnterprise)
