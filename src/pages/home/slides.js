import React, { memo, useState, useCallback, useRef } from 'react'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { useInterval } from 'hooks'

import { theme } from 'consts'

import {
  SectionDivider,
  SectionWrapper,
  SmallSectionWrapper,
  StyledH2,
  StyledSectionWrapper,
  StyledVideo,
  StyledCell,
  StyledCellHeader,
  StyledProductDescription,
} from './styled'

const slidesContent = [
  {
    header: 'The best liveshare out there',
    body: 'Enjoy coding together, remotely',
  },
  {
    header: 'Save time',
    body:
      'Save hours to days per developer by running code in seconds from anywhere.',
  },
  {
    header: 'More effective collaboration',
    body:
      'Reduce managing permissions and sharing the environment to a single click.',
  },
]

const SlideCopy = memo(({ header, body }) => (
  <SmallSectionWrapper isMobile={isMobile}>
    <StyledCell>
      <StyledCellHeader>
        <StyledH2 color={theme.colors.c3}>{header}</StyledH2>
      </StyledCellHeader>
      <StyledProductDescription>{body}</StyledProductDescription>
    </StyledCell>
  </SmallSectionWrapper>
))

const SlidesVideo = memo(({ setCanPlayVideo, ref }) => (
  <StyledVideo
    loop
    ref={ref}
    autoPlay
    preload="none"
    controls={false}
    onCanPlay={setCanPlayVideo(true)}
    src={require('assets/featuresSlides.mp4')}
  >
    Your browser does not support video.
  </StyledVideo>
))

const Slides = () => {
  const [canPlayVideo, setCanPlayVideo] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const videEl = useRef(null)
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
              <SlidesVideo
                ref={videEl}
                setCanPlayVideo={useCallback(() => {
                  setCanPlayVideo(true)
                }, [])}
              />
            </SectionWrapper>
          </SectionWrapper>
        </SectionWrapper>
      </SectionDivider>
    </StyledSectionWrapper>
  )
}

export default memo(Slides)
