import React, { memo, useState } from 'react'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Icon } from 'antd'
// import featuresSlides from 'assets/featuresSlides.mp4'

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
  DemoImage,
  StyledSectionWrapper,
  StyledVideo,
} from './styled'

const BeforeAfter = () => {
  const [canPlayVideo, setCanPlayVideo] = useState(false)
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
              {/* <BeforeItem>
              <StyledH2 color={theme.colors.c3}>After</StyledH2>
            </BeforeItem> */}
              {/* <DemoImage
              decoding="async"
              shadowOpacity="0.1"
              src={require('assets/liveshare.png')}
              alt="teams image"
            /> */}
              <StyledVideo
                controls
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

export default memo(BeforeAfter)
