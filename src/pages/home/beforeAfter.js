import React, { memo } from 'react'
import { isMobileOnly, isMobile } from 'react-device-detect'

import { theme } from 'consts'

import {
  StyledCellHeader,
  StyledSectionWrapper,
  SectionDivider,
  IconContainer,
  SectionWrapper,
  SmallSectionWrapper,
  StyledCell,
  StyledH2,
  StyledHeaderText,
} from './styled'

const BeforeAfter = () => (
  <StyledSectionWrapper
    isSecondary
    padding="20px"
    background="white"
    isMobileOnly={isMobileOnly}
  >
    <SectionDivider isMobile={isMobile}>
      <SectionWrapper isMobile={isMobile} padding="20px 10px">
        <SmallSectionWrapper isMobile={isMobile}>
          <StyledCell>
            <StyledCellHeader>
              <StyledH2 color={theme.colors.c3}>Before</StyledH2>
            </StyledCellHeader>
            <StyledHeaderText>
              Common <b>it works on my machine</b> and <b>work from home</b>{' '}
              problems are a lot of work
            </StyledHeaderText>
            <StyledCellHeader>
              <StyledHeaderText>Virtual machines</StyledHeaderText>
              <IconContainer>
                <img
                  decoding="async"
                  alt="docker"
                  src={require('assets/vm.png')}
                  style={{
                    color: theme.colors.c1,
                  }}
                />
              </IconContainer>
            </StyledCellHeader>
            <StyledCellHeader>
              <StyledHeaderText>Docker containers</StyledHeaderText>
              <IconContainer>
                <img
                  decoding="async"
                  alt="docker"
                  src={require('assets/docker.png')}
                  style={{
                    color: theme.colors.c1,
                  }}
                />
              </IconContainer>
            </StyledCellHeader>
            <StyledCellHeader>
              <StyledHeaderText>Devops teams</StyledHeaderText>
              <IconContainer>
                <img
                  decoding="async"
                  alt="docker"
                  src={require('assets/people.png')}
                  style={{
                    color: theme.colors.c1,
                  }}
                />
              </IconContainer>
            </StyledCellHeader>
            <StyledCellHeader>
              <StyledHeaderText>Leasing computers</StyledHeaderText>
              <IconContainer>
                <img
                  decoding="async"
                  alt="docker"
                  src={require('assets/macbooks.png')}
                  style={{
                    color: theme.colors.c1,
                  }}
                />
              </IconContainer>
            </StyledCellHeader>
          </StyledCell>
        </SmallSectionWrapper>
      </SectionWrapper>
      <SectionWrapper isMobile={isMobile} padding="20px 10px">
        <SmallSectionWrapper isMobile={isMobile}>
          <StyledCell>
            <StyledCellHeader>
              <StyledH2 color={theme.colors.c3}>After</StyledH2>
            </StyledCellHeader>
            <StyledHeaderText>
              Strove simplifies coding and managing programmer teams
            </StyledHeaderText>
          </StyledCell>
        </SmallSectionWrapper>
      </SectionWrapper>
    </SectionDivider>
  </StyledSectionWrapper>
)

export default memo(BeforeAfter)
