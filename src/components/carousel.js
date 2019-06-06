import React from "react"
import styled from "styled-components"
import { Python, Ruby, Typescript, Cpp, Go, Node } from "../images/logos"

const IconContainer = styled.div`
  position: absolute;
  transition: 0.3s ease transform;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 5px; */
  padding: 8px;
  border-radius: 100%;
  border-width: 1px;
  border-color: lightgray;
  border-style: solid;
  opacity: 0.9;
  z-index: 4;

  width: 128px;
  height: 128px;

  &:hover {
    transform: scale(1.5);
    opacity: 1;
  }

  @media (max-width: 960px) {
    flex-shrink: 0;
    width: 128px;
    height: 128px;

    svg {
      width: 80px;
      height: 80px;
    }
  }
`
const IconPosition = styled.div`
  position: absolute;
  transform-origin: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  height: 70vh;
`

const IconBearing = styled.div`
  position: absolute;
  transform-origin: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const SectionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const logos = [
  {
    component: <Node width="80px" height="auto" />,
    name: "Node",
  },
  {
    component: <Python width="80px" height="auto" />,
    name: "Python",
  },
  {
    component: <Ruby width="80px" height="auto" />,
    name: "Ruby",
  },
  {
    component: <Typescript width="80px" height="auto" />,
    name: "Typescript",
  },
  {
    component: <Cpp width="80px" height="auto" />,
    name: "Cpp",
  },
  {
    component: <Go width="80px" height="auto" />,
    name: "Go",
  },
]

class Carousel extends React.Component {
  state = {
    bubbles: logos.length,
    angle: 0,
  }

  setAngle = bubbles => {
    let angle = 360 / bubbles
    this.setState({ angle: angle })
  }

  componentDidMount() {
    this.setAngle(this.state.bubbles)
  }
  renderBubble = () =>
    logos.map((logo, index) => (
      <IconPosition
        style={{ transform: `rotate(${this.state.angle * index}deg)` }}
      >
        <IconBearing
          style={{ transform: `rotate(${-this.state.angle * index}deg)` }}
        >
          <IconContainer onClick={() => console.log(logo.name)}>
            {logo.component}
          </IconContainer>
        </IconBearing>
      </IconPosition>
    ))

  render() {
    return (
      <SectionWrapper>
        {this.renderBubble()}
        {console.log(this.state.bubbles, this.state.angle)}
      </SectionWrapper>
    )
  }
}
export default Carousel
