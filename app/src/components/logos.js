import React, { memo } from 'react'
import styled from 'styled-components'
import { isMobileOnly } from 'react-device-detect'
import { technologies } from 'constants'

const LogosWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.c1};
  width: 100%;
`

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  overflow-x: hidden;
  background-color: inherit;
`

const IconContainer = styled.div`
  position: relative;
  transition: 0.3s ease background-color, 0.3s ease transform;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 0;
  border-radius: 8px;
  opacity: 0.9;

  width: 80px;
  height: auto;

  &:hover {
    opacity: 1;
  }

  :last-of-type {
    margin-right: 0;
  }

  @media (max-width: 960px) {
    flex-shrink: 0;
  }
`

const ScrollAtMobile = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Logos = ({ handleHoverIn, handleHoverOut }) => {
  return (
    <LogosWrapper>
      <SectionWrapper isMobile={isMobileOnly}>
        <ScrollAtMobile>
          {technologies.map(technology => (
            <IconContainer
              key={technology.name}
              onMouseEnter={() => handleHoverIn(technology.description)}
              onMouseLeave={handleHoverOut}
            >
              {technology.component}
            </IconContainer>
          ))}
        </ScrollAtMobile>
      </SectionWrapper>
    </LogosWrapper>
  )
}

export default memo(Logos)
