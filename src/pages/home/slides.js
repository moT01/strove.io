import React, { memo, useState } from 'react'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Icon } from 'antd'
import { useInterval } from 'hooks'

import { theme } from 'consts'

import {
  BeforeItem,
  SectionDivider,
  IconContainer,
  SectionWrapper,
  SmallSectionWrapper,
  StyledH2,
  StyledBeforeText,
  BeforeContainer,
  StyledSectionWrapper,
  StyledVideo,
} from './styled'

const SaveTime = ({ header, body }) => (
  <SmallSectionWrapper isMobile={isMobile}>
    <StyledCell>
      <StyledCellHeader>
        <StyledH2 color={theme.colors.c3}>{header}</StyledH2>
      </StyledCellHeader>
      <StyledProductDescription>{body}</StyledProductDescription>
    </StyledCell>
  </SmallSectionWrapper>
)

const Slides = () => {
  const [canPlayVideo, setCanPlayVideo] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  useInterval(
    () => setAdditionalTimeSpent(additionalTimeSpent + oneMinute),
    canPlayVideo ? 3000 : null
  )
  return (
    <StyledSectionWrapper
      isSecondary
      padding="20px"
      background={theme.colors.c27}
      isMobileOnly={isMobileOnly}
    >
      <SectionDivider isMobile={isMobile}>
        <SectionWrapper isMobile={isMobile} padding="20px 10px">
          <SmallSectionWrapper isMobile={isMobile}>
            <BeforeItem>
              <StyledH2 color={theme.colors.c3}>Alternative for</StyledH2>
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
              <StyledVideo
                loop
                autoPlay
                preload="none"
                controls={false}
                onCanPlay={() => setCanPlayVideo(true)}
                src={require('assets/featuresSlides.mp4')}
              >
                Your browser does not support video.
              </StyledVideo>
            </SectionWrapper>
          </SectionWrapper>
        </SectionWrapper>
      </SectionDivider>
    </StyledSectionWrapper>
  )
}

export default memo(Slides)
