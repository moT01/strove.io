/* eslint-disable */
import React from "react"
import styled from "styled-components"
import {
  CSharp,
  Java,
  Python,
  Ruby,
  Typescript,
  Cpp,
  Go,
  Node,
} from "../images/logos"
import { Link } from "gatsby"
import { SmallCloud, MediumCloud, BigCloud } from "../components/clouds.js"

const SectionWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  overflow-x: hidden;
`

const IconContainer = styled.div`
  position: relative;
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

  width: 10vw;
  height: 10vw;

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
  max-height: 12vw;

  @media (max-width: 960px) {
    justify-content: flex-start;
    overflow-x: scroll;
  }
`

const Logos = () => (
  <SectionWrapper>
    <BigCloud />
    <MediumCloud />
    <SmallCloud />
    <ScrollAtMobile>
      {/* <ImageWrapper width height>
        <Node width="100%" height="auto" />
      </ImageWrapper> */}
      <IconContainer>
        <Node width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <Python width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <Ruby width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <Typescript width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <Cpp width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <Go width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <Java width="100%" height="auto" />
      </IconContainer>
      <IconContainer>
        <CSharp width="100%" height="auto" />
      </IconContainer>
    </ScrollAtMobile>
    <Link to="/page-2/" style={{ marginTop: "15px" }}>
      And many more!
    </Link>
  </SectionWrapper>
)
/* eslint-enable */
export default Logos
