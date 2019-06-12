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

const ShowText = keyframes`

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
  height: 6vh;
  width: 40%;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  color: grey;
  border-radius: 1vh;
  border-color: ${props => (props.theme ? props.theme : `gray`)};
  box-shadow: 0 1.5vh 1.5vh -1.5vh ${props => (props.theme ? props.theme : `gray`)};
  transition: background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease,
    border-color 0.5s ease;
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
            <Button
              theme={this.state.selectedColor}
              style={{
                backgroundColor: `${this.state.selectedColor}`,
                color: `${this.state.selectedColor ? `#ffffff` : "gray"}`,
              }}
            >
              Open Editor
            </Button>
            <Button
              theme={this.state.selectedColor}
              style={{
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
