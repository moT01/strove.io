import React from "react"
import styled, { keyframes } from "styled-components"
import { Python, Ruby, Typescript, Cpp, Go, Node } from "../images/logos"
import { Transition } from "react-transition-group"

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

const PoppedBubble = React.memo(({ angle, poppedBubbleId }) => (
  <IconPosition
    style={{
      transform: `rotate(${angle * (poppedBubbleId + 1)}deg)`,
      height: 0,
    }}
  >
    <IconBearing
      style={{
        transform: `rotate(${-angle * (poppedBubbleId + 1)}deg)`,
      }}
    >
      <IconContainer
        style={{
          width: `12vw`,
          height: `12vw`,
          opacity: `1`,
        }}
      >
        {logos[poppedBubbleId].component}
      </IconContainer>
    </IconBearing>
  </IconPosition>
))

const Bubbles = React.memo(({ angle, handleClick, bubbles }) =>
  bubbles.map((logo, index) => (
    <IconPosition
      key={logo.name}
      style={{ transform: `rotate(${angle * index}deg)` }}
    >
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

  setAngle = bubbles => {
    let angle = 360 / bubbles
    this.setState({ angle: angle })
  }

  handleClick = bubble => {
    let popId = this.state.poppedBubbleId
    const newBubbles = [...this.state.bubbles]
    let newPopId = bubble.id
    if (popId !== -10) {
      newBubbles.splice(popId, 0, logos[popId])
    }
    newBubbles.splice(newPopId, 1)
    this.setState({ bubbles: newBubbles, poppedBubbleId: newPopId }, () =>
      this.setAngle(this.state.bubbles.length)
    )
  }

  componentDidMount() {
    this.setAngle(this.state.bubbles.length)
  }

  render() {
    const { angle } = this.state
    return (
      <SectionWrapper>
        {console.log(this.state.bubbles, angle)}
        <Bubbles
          handleClick={this.handleClick}
          angle={angle}
          bubbles={this.state.bubbles}
        />
        {this.state.poppedBubbleId !== -10 && (
          <PoppedBubble
            angle={angle}
            poppedBubbleId={this.state.poppedBubbleId}
          />
        )}
      </SectionWrapper>
    )
  }
}
export default Carousel
