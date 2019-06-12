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
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  height: auto;
  align-items: center;
  justify-content: space-between;
`
const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: 10vh;
  width: 40%;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  color: #000000;
  border-radius: 5px;
`

class Circle extends React.Component {
  state = {
    selection: "clouds",
    color: "gray",
    selected: "",
    selectedColor: "",
  }
  handleLogoClick = logo => {
    this.setState({ selected: logo.name })
    this.setState({ selectedColor: logo.color })
  }
  handleHoverIn = logo => {
    this.setState({ selection: logo.name })
    this.setState({ color: logo.color })
  }

  handleHoverOut = () => {
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
              <span
                style={{
                  color: `${
                    this.state.selectedColor
                      ? this.state.selectedColor
                      : this.state.color
                  }`,
                }}
              >
                {this.state.selected
                  ? this.state.selected
                  : this.state.selection}
              </span>
            </h2>
            <h3>One environment for everyone</h3>
          </TextWrapper>
          <ButtonsWrapper>
            <Button style={{ backgroundColor: `${this.state.selectedColor}` }}>
              Open Editor
            </Button>
            <Button
              style={{
                borderColor: `${this.state.selectedColor}`,
                color: `${this.state.selectedColor}`,
              }}
            >
              See examples
            </Button>
          </ButtonsWrapper>
        </SubSectionWrapper>
        <SubSectionWrapper>
          <Carousel
            handleHoverOut={this.handleHoverOut}
            handleLogoClick={this.handleLogoClick}
            handleHoverIn={this.handleHoverIn}
            selected={this.selected}
          />
        </SubSectionWrapper>
      </SectionWrapper>
    )
  }
}

export default Circle
