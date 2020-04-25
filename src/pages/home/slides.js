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
  StyledCell,
  StyledCellHeader,
  StyledProductDescription,
} from './styled'

const SlideCopy = ({ header, body }) => (
  <SmallSectionWrapper isMobile={isMobile}>
    <StyledCell>
      <StyledCellHeader>
        <StyledH2 color={theme.colors.c3}>{header}</StyledH2>
      </StyledCellHeader>
      <StyledProductDescription>{body}</StyledProductDescription>
    </StyledCell>
  </SmallSectionWrapper>
)

const slidesContent = [
  {
    header: 'Save time',
    body:
      'Save hours to days per developer by running code in seconds from anywhere.',
  },
  {
    header: 'More effective collaboration',
    body:
      'Spend more time on what matters by reducing managing permissions and sharing the environment to a single click.',
  },
  {
    header: 'The best liveshare out there',
    body: 'Enjoy coding together, remotely',
  },
]

const Slides = () => {
  const [canPlayVideo, setCanPlayVideo] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  useInterval(
    () => setSlideIndex(slideIndex > 1 ? 0 : slideIndex + 1),
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
          <SlideCopy
            header={slidesContent[slideIndex].header}
            body={slidesContent[slideIndex].body}
          />
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
