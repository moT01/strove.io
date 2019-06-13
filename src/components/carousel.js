import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { Python, Ruby, Typescript, Cpp, Go, Node } from "../images/logos"
// import {
//   Transition,
//   CSSTransition,
//   TransitionGroup,
// } from "react-transition-group"

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
  transition: 10000ms;
  position: absolute;
  transform-origin: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  height: 100%;

  /* &.move-enter {
    transform: translateY(0%);
  }
  &.move-enter.move-enter-active {
    transform: translateY(50%);
    transition: transform 5000ms linear;
  }
  &.move-enter-done {
    transform: translateY() 50%;
  }
  &.move-exit {
    transform: translateY(50%);
  }
  &.move-exit.move-exit-active {
    transform: translateY(0%);
    transition: transform 5000ms linear;
  }
  &.move-exit-done {
    transform: translateY(0%);
  } */
`

const IconBearing = styled.div`
  position: absolute;
  transform-origin: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const IconRotation = styled.div`
  position: absolute;
  transform-origin: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  height: 65%;
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
    component: <Node width="10vw" height="auto" />,
    name: "Node",
    color: "lightgreen",
    id: 0,
  },
  {
    component: <Python width="10vw" height="auto" />,
    name: "Python",
    color: "yellow",
    id: 1,
  },
  {
    component: <Ruby width="10vw" height="auto" />,
    name: "Ruby",
    color: "red",
    id: 2,
  },
  {
    component: <Typescript width="8vw" height="auto" />,
    name: "Typescript",
    color: "blue",
    id: 3,
  },
  {
    component: <Cpp width="10vw" height="auto" />,
    name: "C++",
    color: "lightblue",
    id: 4,
  },
  {
    component: <Go width="8vw" height="auto" />,
    name: "Go",
    color: "#0072ce",
    id: 5,
  },
]

const PoppedBubble = React.memo(({ angle, poppedBubbleId }) => (
  <IconRotation
    style={{
      transform: `rotate(${angle * (poppedBubbleId + 1)}deg)`,
    }}
  >
    {/* <TransitionGroup>
      <CSSTransition
        // in={animate}
        key={poppedBubbleId}
        timeout={10000}
        classNames="move"
        // transitionAppear="true"
      > */}
    <IconPosition>
      <IconBearing
        style={{
          transform: `rotate(${-angle * (poppedBubbleId + 1)}deg)`,
        }}
      >
        <IconContainer>{logos[poppedBubbleId].component}</IconContainer>
      </IconBearing>
    </IconPosition>
    {/* </CSSTransition>
    </TransitionGroup> */}
  </IconRotation>
))

const Bubbles = React.memo(
  ({ angle, handleLogoClick, handleHoverOut, bubbles }) =>
    bubbles.map((logo, index) => (
      <IconRotation
        key={logo.name}
        style={{ transform: `rotate(${angle * index}deg)` }}
      >
        <IconPosition>
          <IconBearing style={{ transform: `rotate(${-angle * index}deg)` }}>
            <IconContainer
              onClick={() => handleLogoClick(logo)}
              onMouseEnter={() => handleLogoClick(logo)}
              onMouseLeave={() => handleHoverOut()}
            >
              {logo.component}
            </IconContainer>
          </IconBearing>
        </IconPosition>
      </IconRotation>
    ))
)

const Carousel = props => {
  const [bubbles, setBubbles] = useState(logos)
  const [angle, setAngle] = useState(360 / bubbles.length)
  const [poppedBubbleId, setPoppedBubbleId] = useState(-10)
  const [animate, setAnimate] = useState(true)
  const [selection, setSelection] = useState("")

  const handleClick = bubble => {
    let popId = poppedBubbleId
    // const newBubbles = [...bubbles]
    let newPopId = bubble.id
    // if (popId !== -10) {
    //   newBubbles.splice(popId, 0, logos[popId])
    // }
    // newBubbles.splice(newPopId, 1)

    setPoppedBubbleId(newPopId)
    // setBubbles(newBubbles)
    // setAngle(360 / newBubbles.length)
    // setAnimate(!animate)
  }

  return (
    <SectionWrapper>
      <Bubbles
        handleLogoClick={props.handleLogoClick}
        handleHoverOut={props.handleHoverOut}
        angle={angle}
        bubbles={bubbles}
      />
      {/* {poppedBubbleId !== -10 && (
        <PoppedBubble angle={angle} poppedBubbleId={poppedBubbleId} />
      )} */}
      {/* <h1>{selection}</h1> */}
    </SectionWrapper>
  )
}
export default Carousel
