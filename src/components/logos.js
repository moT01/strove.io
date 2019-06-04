/* eslint-disable */
import React from "react"
import styled, { keyframes } from "styled-components"
import {
  CSharp,
  Java,
  Javascript,
  Python,
  Ruby,
  Typescript,
  CLogo,
  Cpp,
  Go,
  Node,
} from "../images/logos"
import { Link } from "gatsby"
import bg from "../images/backgroundClouds.png"

const Animation = keyframes`
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
`

const SectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white url(${bg});
  background-size: cover;
  background-position: 0 0;
  background-repeat: repeat-x;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  animation: ${Animation} 12s linear infinite;
`

const IconContainer = styled.div`
  transition: 0.3s ease background-color, 0.3s ease transform;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 5px;
  padding: 8px;
  background: rgba(52, 152, 219, 0.4);
  border-radius: 8px;
  opacity: 0.9;

  width: 128px;
  height: 128px;

  &:hover {
    transform: scale(1.5);
    background: rgba(52, 152, 219, 0.7);
    opacity: 1;
  }

  @media (max-width: 960px) {
    flex-shrink: 0;
    width: 128px;
    height: 128px;

    svg {
      width: 115px;
      height: 115px;
    }
  }
`

const ScrollAtMobile = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  min-width: 100%;
  max-width: 90vw;
  max-height: 140px;
  // border-width: 1px;
  // border-color: grey;
  // border-style: solid;

  @media (max-width: 960px) {
    justify-content: flex-start;
    overflow-x: scroll;
  }
`

const Logos = () => (
  <SectionWrapper>
    <ScrollAtMobile>
      <IconContainer>
        <Node width="126px" height="auto" />
      </IconContainer>
      <IconContainer>
        <Python width="126px" height="auto" />
      </IconContainer>
      <IconContainer>
        <Ruby width="126px" height="auto" />
      </IconContainer>
      <IconContainer>
        <Typescript width="126px" height="auto" />
      </IconContainer>
      <IconContainer>
        <Cpp width="126px" height="auto" />
      </IconContainer>
      <IconContainer>
        <Go width="126px" height="auto" />
      </IconContainer>
      <IconContainer>
        <Java width="126px" height="auto" />
      </IconContainer>
      <IconContainer>
        <CSharp width="126px" height="auto" />
      </IconContainer>
    </ScrollAtMobile>
    <Link to="/page-2/" style={{ marginTop: "15px" }}>
      And many more!
    </Link>
  </SectionWrapper>
)
/* eslint-enable */
export default Logos
