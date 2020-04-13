import React, { memo } from 'react'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Icon } from 'antd'

import { theme } from 'consts'

import {
  BeforeItem,
  SectionDivider,
  IconContainer,
  SectionWrapper,
  SmallSectionWrapper,
  StyledCell,
  StyledH2,
  StyledBeforeText,
  BeforeContainer,
  BeforeAfterSection,
  DemoImage,
  StyledSectionWrapper,
} from './styled'

const BeforeAfter = () => (
  <BeforeAfterSection
    isSecondary
    padding="20px"
    background="white"
    isMobileOnly={isMobileOnly}
  >
    <SectionDivider isMobile={isMobile}>
      <SectionWrapper isMobile={isMobile} padding="20px 10px">
        <SmallSectionWrapper isMobile={isMobile}>
          <StyledCell>
            <BeforeItem>
              <StyledH2 color={theme.colors.c3}>Before</StyledH2>
            </BeforeItem>
            <BeforeContainer>
              <BeforeItem>
                <StyledBeforeText>Virtual machines</StyledBeforeText>
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
              </BeforeItem>
              <BeforeItem>
                <StyledBeforeText>Docker containers</StyledBeforeText>
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
              </BeforeItem>
              <BeforeItem>
                <StyledBeforeText>Devops teams</StyledBeforeText>
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
              </BeforeItem>
              <BeforeItem>
                <StyledBeforeText>Leasing computers</StyledBeforeText>
                <IconContainer>
                  <Icon
                    type="laptop"
                    style={{ color: theme.colors.c3, fontSize: 40 }}
                  />
                </IconContainer>
              </BeforeItem>
            </BeforeContainer>
          </StyledCell>
        </SmallSectionWrapper>
      </SectionWrapper>
      <SectionWrapper isMobile={isMobile} padding="20px 10px">
        <SmallSectionWrapper isMobile={isMobile}>
          <StyledCell>
            <BeforeItem>
              <StyledH2 color={theme.colors.c3}>After</StyledH2>
            </BeforeItem>
            <BeforeContainer>
              <DemoImage
                decoding="async"
                shadowOpacity="0.1"
                src={require('assets/liveshare.png')}
                alt="teams image"
              />
            </BeforeContainer>
          </StyledCell>
        </SmallSectionWrapper>
      </SectionWrapper>
    </SectionDivider>
  </BeforeAfterSection>
)

const Before = () => (
  <StyledSectionWrapper
    isSecondary
    padding="20px"
    background="white"
    isMobileOnly={isMobileOnly}
  >
    <SectionDivider isMobile={isMobile}>
      <SectionWrapper isMobile={isMobile} padding="20px 10px">
        <SmallSectionWrapper isMobile={isMobile}>
          <BeforeItem>
            <StyledH2 color={theme.colors.c3}>Before</StyledH2>
          </BeforeItem>
          <BeforeContainer>
            <BeforeItem>
              <StyledBeforeText>Virtual machines</StyledBeforeText>
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
            </BeforeItem>
            <BeforeItem>
              <StyledBeforeText>Docker containers</StyledBeforeText>
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
            </BeforeItem>
            <BeforeItem>
              <StyledBeforeText>Devops teams</StyledBeforeText>
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
            </BeforeItem>
            <BeforeItem>
              <StyledBeforeText>Leasing computers</StyledBeforeText>
              <IconContainer>
                <Icon
                  type="laptop"
                  style={{ color: theme.colors.c3, fontSize: 40 }}
                />
              </IconContainer>
            </BeforeItem>
          </BeforeContainer>
        </SmallSectionWrapper>
      </SectionWrapper>
      <SectionWrapper isMobile={isMobile} padding="20px 10px">
        <SectionWrapper isMobile={isMobile} padding="20px 10px">
          <SectionWrapper isMobile={isMobile}>
            <DemoImage
              decoding="async"
              shadowOpacity="0.1"
              src={require('assets/liveshare.png')}
              alt="teams image"
            />
          </SectionWrapper>
        </SectionWrapper>
      </SectionWrapper>
    </SectionDivider>
  </StyledSectionWrapper>
)

export default memo(Before)
