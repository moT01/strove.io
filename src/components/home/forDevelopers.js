import React, { memo } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { Icon } from 'antd'

import { theme } from 'consts'

import {
  StyledSectionWrapper,
  StyledProductDescription,
  SectionDivider,
  StyledH3,
  IconContainer,
} from './styled'

const ForEnterprise = () => (
  <StyledSectionWrapper
    isSecondary
    background={theme.colors.c2}
    padding={`50px ${isMobileOnly ? '20px' : '25%'} 0`}
    isMobileOnly={isMobileOnly}
  >
    <SectionDivider flexDirection="column">
      <IconContainer>
        <Icon
          type="code"
          style={{ fontSize: '26px', color: theme.colors.c3 }}
        />
      </IconContainer>
      <StyledH3 color={theme.colors.c3}>Developers First</StyledH3>
      <StyledProductDescription color={theme.colors.c26}>
        Strove is the platform made by programmers for programmers. We made sure
        that Strove resembles local environment as closely as possible while
        adding cloud-related productivity benefits on top of it.
      </StyledProductDescription>
    </SectionDivider>
  </StyledSectionWrapper>
)

export default memo(ForEnterprise)
