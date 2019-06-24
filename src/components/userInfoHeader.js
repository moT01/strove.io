import React, { useState } from "react"
import styled from "styled-components"
import onClickOutside from "react-onclickoutside"
import { Link } from "gatsby"
import { useDispatch } from "react-redux"

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
  background-color: ${props => (props.invert ? "#ffffff" : "#0072ce")};
  align-self: flex-end;
  z-index: 3;
`
const Text = styled.span`
  font-size: 3vh;
  color: white;

  :hover {
    color: white;
  }

  @media (max-width: 1366px) {
    font-size: 2.5vh;
  }
`

const Inline = styled.div`
  display: inline-block;
  width: 4vh;
  height: auto;
  margin-left: 4px;
`

const UserPhoto = styled.img`
  width: 4vh;
  height: auto;
  margin-left: 4px;
  border-radius: 5px;
`

const LinkWrapper = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4vh;
  margin: 0;
`

const ZeldaWrapper = styled(LinkWrapper)`
  height: 4vh;
  flex-direction: column;
  overflow: visible;
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
  color: ${props => (!props.invert ? "#ffffff" : "#0072ce")};
  border-bottom-left-radius: ${props => props.isLast && "8px"};
  border-bottom-right-radius: ${props => props.isLast && "8px"};
  :hover {
    background-color: ${props => (!props.invert ? "#ffffff" : "#0072ce")};
    color: ${props => (props.invert ? "#ffffff" : "#0072ce")};
  }
`

const UserInfoHeader = props => {
  const [options, setOptions] = useState(props.options)
  const dispatch = useDispatch()

  UserInfoHeader.handleClickOutside = () => props.handleDropdown()

  return (
    <ZeldaWrapper>
      <LinkWrapper onClick={() => props.handleDropdownClick()}>
        <Link
          style={{
            color: `white`,
            textDecoration: `none`,
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <Text>{props.user.username}</Text>
          <Inline>
            <UserPhoto src={props.user.userphoto} style={{ margin: `0` }} />
          </Inline>
        </Link>
      </LinkWrapper>
      {props.showDropdown && (
        <MenuWrapper invert>
          {options.map(option =>
            option.option !== "Logout" ? (
              <Option invert>{option.option}</Option>
            ) : (
              <Option isLast invert onClick={() => option.onClick(dispatch)}>
                {option.option}
              </Option>
            )
          )}
        </MenuWrapper>
      )}
    </ZeldaWrapper>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => UserInfoHeader.handleClickOutside,
}

export default onClickOutside(UserInfoHeader, clickOutsideConfig)
