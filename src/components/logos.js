/* eslint-disable */
import React from "react"
import styled, { css } from "styled-components"
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

const IconContainer = styled.div`
  transition: 0.3s ease background-color;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 5px;
  padding: 8px;
  border-width: 1px;
  border-color: grey;
  border-style: solid;
  background-color: grey;
  border-radius: 5%;

  width: 128px;
  height: 128px;

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
  border-width: 1px;
  border-color: grey;
  border-style: solid;

  @media (max-width: 960px) {
    justify-content: flex-start;
    overflow-x: scroll;
  }
`

const Logos = () => (
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
)
/* eslint-enable */
export default Logos
