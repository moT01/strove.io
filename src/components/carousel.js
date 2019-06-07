import React from "react"
import styled, { keyframes } from "styled-components"
import { Python, Ruby, Typescript, Cpp, Go, Node } from "../images/logos"

const IconAnimation = keyframes`
  0%, 100% {
    transform: scale(1.3)
  }
  50% {
    transform: scale(1.4)
  }
`

const HoverIcon = keyframes`
  0% {
  }
  100% {
    transform: scale(1.3)
  }
`

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  opacity: 0.9;
  z-index: 4;

  width: 10vw;
  height: 10vw;

  &:hover {
    opacity: 1;
    animation: ${HoverIcon} 0.3s ease,
      ${IconAnimation} 4s 0.3s ease-in-out infinite;
  }

  @media (max-width: 960px) {
    flex-shrink: 0;
    width: 10vw;
    height: 10vw;

    svg {
      width: 8vw;
      height: 8vw;
    }
  }
`
const IconPosition = styled.div`
  position: absolute;
  transform-origin: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  height: 65%;
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
  height: 100%;
  align-items: center;
  justify-content: center;
`

const logos = [
  {
    component: <Node width="80%" height="auto" />,
    name: "Node",
    id: 0,
  },
  {
    component: <Python width="80%" height="auto" />,
    name: "Python",
    id: 1,
  },
  {
    component: <Ruby width="80%" height="auto" />,
    name: "Ruby",
    id: 2,
  },
  {
    component: <Typescript width="70%" height="auto" />,
    name: "Typescript",
    id: 3,
  },
  {
    component: <Cpp width="80%" height="auto" />,
    name: "Cpp",
    id: 4,
  },
  {
    component: <Go width="70%" height="auto" />,
    name: "Go",
    id: 5,
  },
]

const Bubbles = React.memo(({ angle, handleClick }) =>
  logos.map((logo, index) => (
    <IconPosition style={{ transform: `rotate(${angle * index}deg)` }}>
      <IconBearing style={{ transform: `rotate(${-angle * index}deg)` }}>
        <IconContainer onClick={() => handleClick(logo)}>
          {logo.component}
        </IconContainer>
      </IconBearing>
    </IconPosition>
  ))
)

class Carousel extends React.Component {
  state = {
    bubbles: logos,
    angle: 0,
    poppedBubbleId: -10,
  }

  calculateAngle = bubbles => {
    let angle = 360 / bubbles
    return angle
  }

  setAngle = bubbles => {
    let angle = this.calculateAngle(bubbles)
    this.setState({ angle: angle })
  }

  setNewAngle = () => {
    let newAngle = this.calculateAngle(this.state.bubbles.length)
    this.setState({ angle: newAngle })
  }

  // popBubble = bubble => {
  //   let popId = this.state.poppedBubbleId
  //   const oldBubbles = this.state.bubbles
  //   let newPopId = bubble.id
  //   console.log("------------------TCL: Carousel -> oldBubbles", oldBubbles)
  //   console.log("old pop bubble id", popId)
  //   let newBubbles =
  //     popId !== -10 ? oldBubbles.splice(popId, 0, logos[popId]) : oldBubbles

  //   console.log("TCL: Carousel -> newBubbles after unpop", newBubbles)

  //   newBubbles.splice(newPopId, 1)
  //   console.log("TCL: Carousel -> newBubbles after splice", newBubbles)
  //   console.log("TCL: Carousel -> newPopId", newPopId)

  //   this.setState({ bubbles: newBubbles, poppedBubbleId: newPopId })
  // }

  handleClick = prop => {
    // this.popBubble(prop)
    this.setNewAngle()
    console.log(prop.name, prop.id)
  }

  componentDidMount() {
    this.setAngle(this.state.bubbles.length)
  }

  render() {
    const { angle } = this.state
    return (
      <SectionWrapper>
        <Bubbles handleClick={this.handleClick} angle={angle} />
        {console.log(this.state.bubbles, this.state.angle)}
      </SectionWrapper>
    )
  }
}
export default Carousel
