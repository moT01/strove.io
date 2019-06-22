/* eslint-disable */
import React, { useState } from "react"
import styled from "styled-components"
import { Docker, Github, Google, VSCode } from "../images/logos"

const logosArr = [
  {
    component: <Google width="100%" height="auto" />,
    name: "Google",
    description: "Google cloud is cool and cloudy",
  },
  {
    component: (
      <VSCode style={{ fill: "#303c42" }} width="100%" height="auto" />
    ),
    name: "VSCode",
    description: "VSCode for editor",
  },
  {
    component: <Docker width="100%" height="auto" />,
    name: "Docker",
    description: "Docker isn't actually a whale",
  },
  {
    component: <Github width="100%" height="auto" />,
    name: "Github",
    description: "Github integration for state-of-the-art version control",
  },
]

const SectionWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
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
  margin: 0 5px 0 5px;
  border-radius: 8px;
  opacity: 0.9;

  width: 10%;
  height: auto;

  &:hover {
    opacity: 1;
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

const Logos = props => {
  const [logos, setLogos] = useState(logosArr)

  return (
    <SectionWrapper>
      <ScrollAtMobile>
        {logos.map(logo => (
          <IconContainer
            onMouseEnter={() => props.handleHoverIn(logo.description)}
            onMouseLeave={() => props.handleHoverOut()}
          >
            {logo.component}
          </IconContainer>
        ))}
      </ScrollAtMobile>
    </SectionWrapper>
  )
}
/* eslint-enable */
export default Logos
