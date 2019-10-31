import React, { memo } from 'react'
import styled from 'styled-components'
import { Docker, Github, Google, VSCode } from 'images/logos'

const logos = [
  {
    component: (
      <Google style={{ fill: '#303c42' }} width="100%" length="auto" />
    ),
    name: 'Google',
    description:
      'Google Cloud allows us to host secure, consistent cloud environment',
  },
  {
    component: (
      <VSCode style={{ fill: '#303c42' }} width="100%" length="auto" />
    ),
    name: 'VSCode',
    description:
      'Strove.io supports VSCode to provide the best programming experience',
  },
  {
    component: (
      <Docker style={{ fill: '#303c42' }} width="100%" length="auto" />
    ),
    name: 'Docker',
    description: "Docker isn't actually a whale",
  },
  {
    component: (
      <Github style={{ fill: '#303c42' }} width="100%" length="auto" />
    ),
    name: 'Github',
    description:
      'Github, Gitlab and Bitbucket integration for state-of-the-art version control',
  },
]

const SectionWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  overflow-x: hidden;
`

const IconContainer = styled.div`
  position: relative;
  transition: 0.3s ease background-color, 0.3s ease transform;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 0 50px 0 0;
  border-radius: 8px;
  opacity: 0.9;

  width: 40px;
  height: auto;

  &:hover {
    opacity: 1;
  }

  :last-of-type {
    margin-right: 0;
  }

  @media (max-width: 960px) {
    flex-shrink: 0;
    width: 20%;
    height: 20%;
  }
`

const ScrollAtMobile = styled.div`
  display: flex;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 70%;
  max-width: 80vw;

  @media (max-width: 960px) {
    justify-content: flex-start;
    overflow-x: scroll;
  }
`

const Logos = ({ handleHoverIn, handleHoverOut }) => {
  return (
    <SectionWrapper>
      <ScrollAtMobile>
        {logos.map(logo => (
          <IconContainer
            key={logo.name}
            onMouseEnter={() => handleHoverIn(logo.description)}
            onMouseLeave={handleHoverOut}
          >
            {logo.component}
          </IconContainer>
        ))}
      </ScrollAtMobile>
    </SectionWrapper>
  )
}

export default memo(Logos)
