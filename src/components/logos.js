/* eslint-disable */
import React from "react"
import styled from "styled-components"
import { Docker, Github, Google, VSCode } from "../images/logos"

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
  margin: 5px;
  border-radius: 8px;
  opacity: 0.9;

  width: 10%;
  height: auto;

  &:hover {
    transform: scale(1.2);
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

const Logos = () => (
  <SectionWrapper>
    <ScrollAtMobile>
      <IconContainer>
        <Google width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <Docker width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <VSCode width="100%" height="auto" fill="#303c42"/>
      </IconContainer>
      <IconContainer>
        <Github width="100%" height="auto" />
      </IconContainer>
    </ScrollAtMobile>
  </SectionWrapper>
)
/* eslint-enable */
export default Logos
