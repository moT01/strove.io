import React from "react"
import styled from "styled-components"
import { Python, Ruby, Typescript, Cpp, Go, Node } from "../images/logos"

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

  width: 128px;
  height: 128px;

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

const logos = [
  <Node width="80px" height="auto" />,
  <Python width="80px" height="auto" />,
  <Ruby width="80px" height="auto" />,
  <Typescript width="80px" height="auto" />,
  <Cpp width="80px" height="auto" />,
  <Go width="80px" height="auto" />,
]

const renderBubble = () => logos.map(x => <IconContainer>{x}</IconContainer>)

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bubbles: logos.length,
    }
  }
  render() {
    return renderBubble()
  }
}
export default Carousel
