import React, { useState } from "react"
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
  transition: 500ms;
  position: absolute;
  transform-origin: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  height: 100%;
  transform: scale(
    ${({ state }) => (state === "entering" || state === "entered" ? 0.1 : 1)}
  );
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
  transition: 500ms;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const Animation = styled.div`
  transition: 0.5s;
  width: 20px;
  height: 20px;
  transform: translateX(
    ${({ state }) => (state === "entering" || state === "entered" ? 20 : 0)}px
  );
  background: ${({ state }) => {
    switch (state) {
      case "entering":
        return "red"
      case "entered":
        return "blue"
      case "exiting":
        return "green"
      case "exited":
        return "yellow"
    }
  }};
`

const logos = [
  {
    component: <Node width="10vw" height="auto" />,
    name: "Node",
    id: 0,
  },
  {
    component: <Python width="10vw" height="auto" />,
    name: "Python",
    id: 1,
  },
  {
    component: <Ruby width="10vw" height="auto" />,
    name: "Ruby",
    id: 2,
  },
  {
    component: <Typescript width="8vw" height="auto" />,
    name: "Typescript",
    id: 3,
  },
  {
    component: <Cpp width="10vw" height="auto" />,
    name: "Cpp",
    id: 4,
  },
  {
    component: <Go width="8vw" height="auto" />,
    name: "Go",
    id: 5,
  },
]

const PoppedBubble = React.memo(({ angle, poppedBubbleId, state, animate }) => (
  <IconRotation
    style={{
      transform: `rotate(${angle * (poppedBubbleId + 1)}deg)`,
      // height: 0,
    }}
  >
    <Transition in={animate} timeout={500}>
      <IconPosition state={state}>
        <IconBearing
          style={{
            transform: `rotate(${-angle * (poppedBubbleId + 1)}deg)`,
          }}
        >
          <IconContainer>{logos[poppedBubbleId].component}</IconContainer>
        </IconBearing>
      </IconPosition>
    </Transition>
  </IconRotation>
))

const Bubbles = React.memo(({ angle, handleClick, bubbles, state }) =>
  bubbles.map((logo, index) => (
    <IconRotation
      key={logo.name}
      style={{ transform: `rotate(${angle * index}deg)` }}
    >
      <IconPosition>
        <IconBearing style={{ transform: `rotate(${-angle * index}deg)` }}>
          <IconContainer onClick={() => handleClick(logo)}>
            {logo.component}
          </IconContainer>
        </IconBearing>
      </IconPosition>
    </IconRotation>
  ))
)

const Carousel = () => {
  const [bubbles, setBubbles] = useState(logos)
  const [angle, setAngle] = useState(360 / bubbles.length)
  const [poppedBubbleId, setPoppedBubbleId] = useState(-10)
  const [animate, setAnimate] = useState(false)

  const handleClick = bubble => {
    let popId = poppedBubbleId
    const newBubbles = [...bubbles]
    let newPopId = bubble.id
    if (popId !== -10) {
      newBubbles.splice(popId, 0, logos[popId])
    }
    newBubbles.splice(newPopId, 1)

    setPoppedBubbleId(newPopId)
    setBubbles(newBubbles)
    setAngle(360 / newBubbles.length)
    setAnimate(!animate)
  }

  return (
    <SectionWrapper>
      {console.log(bubbles, angle)}
      <Bubbles handleClick={handleClick} angle={angle} bubbles={bubbles} />
      {poppedBubbleId !== -10 && (
        <Transition in={animate} timeout={500}>
          {state => (
            <PoppedBubble
              angle={angle}
              poppedBubbleId={poppedBubbleId}
              state={state}
              animate={animate}
            />
          )}
        </Transition>
      )}
    </SectionWrapper>
  )
}
export default Carousel
