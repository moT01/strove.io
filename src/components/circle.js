import React from "react"
import styled, { keyframes } from "styled-components"
import Carousel from "./carousel.js"

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const SectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 93vh;
  animation: ${FadeIn} 1s ease-out;
`

const SubSectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: flex-start;
  justify-content: center;
  text-align: justify;
`

class Circle extends React.Component {
  state = {
    selection: "clouds",
    color: "gray",
  }
  handleClick = logo => {
    // setSelection(logo.name)
    this.setState({ selection: logo.name })
    this.setState({ color: logo.color })
  }
  handleHoverOut = logo => {
    this.setState({ selection: "clouds" })
    this.setState({ color: "gray" })
  }
  render() {
    return (
      <SectionWrapper>
        <SubSectionWrapper>
          <TextWrapper>
            <h1>SiliSky</h1>
            <h2>
              Code in{" "}
              <span style={{ color: `${this.state.color}` }}>
                {this.state.selection}
              </span>
            </h2>
            <h3>One environment for everyone</h3>
          </TextWrapper>
        </SubSectionWrapper>
        <SubSectionWrapper>
          <Carousel
            handleHoverOut={this.handleHoverOut}
            handleHover={this.handleClick}
            handleClick={this.handleClick}
          />
        </SubSectionWrapper>
      </SectionWrapper>
    )
  }
}

export default Circle
