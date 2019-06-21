import React, { useState } from "react"
import styled, { keyframes } from "styled-components"

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 10vw;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  border-radius: 10px;
  border-width: 1px;
  border-color: #0072ce;
  border-style: solid;
  background-color: ${props => (props.team ? "#ffffff" : "#0072ce")};
  align-self: flex-end;
  z-index: 3;
`

const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.2vh`)};
  width: 100%;
  height: auto;
  font-size: 2vh;
  color: ${props => (!props.team ? "#ffffff" : "#0072ce")};
  border-bottom-left-radius: ${props => props.isLast && "8px"};
  border-bottom-right-radius: ${props => props.isLast && "8px"};
  :hover {
    background-color: ${props => (!props.team ? "#ffffff" : "#0072ce")};
    color: ${props => (props.team ? "#ffffff" : "#0072ce")};
  }
`

const Dropdown = props => {
  const [options, setOptions] = useState(props.options)

  return (
    <MenuWrapper team>
      {options.map(option =>
        option.option !== "Logout" ? (
          <Option team>{option.option}</Option>
        ) : (
          <Option isLast team>
            {option.option}
          </Option>
        )
      )}
    </MenuWrapper>
  )
}

export default Dropdown
