import React, { useState } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/fullScreenLoader'

import { selectors } from 'state'

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
  background-color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
  align-self: flex-end;
  z-index: 3;
  @media (max-width: 1366px) {
    width: auto;
  }
`

const Text = styled.span`
  font-size: 3vh;
  color: white;
  transition: color 0.3s;

  :hover {
    color: black;
  }

  @media (max-width: 1024px) {
    font-size: 4vw;
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
  @media (max-width: 1024px) {
    width: 3.5vh;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4vh;
  width: auto;
  margin: 0;
`

const StyledDropdown = styled.div`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const InfoWrapper = styled(Wrapper)`
  flex-direction: column;
  overflow: visible;
  cursor: pointer;
`

const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.2vh`)};
  width: 100%;
  height: auto;
  font-size: 2.2vh;
  color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
  border-bottom-left-radius: ${props => props.isLast && '8px'};
  border-bottom-right-radius: ${props => props.isLast && '8px'};

  :hover {
    background-color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
    cursor: pointer;
  }
  @media (max-width: 1366px) {
    font-size: 2vh;
  }
`

const UserInfoHeader = props => {
  const [options] = useState(props.options)
  const dispatch = useDispatch()
  const isLoading = useSelector(selectors.getLoading('user'))

  UserInfoHeader.handleClickOutside = () => props.handleDropdown()

  return (
    <InfoWrapper>
      {isLoading ? (
        <Loader isFullscreen={false} height={'4vh'} color={'#ffffff'} />
      ) : (
        <>
          <Wrapper onClick={props.handleDropdownClick}>
            <StyledDropdown>
              <Text>{props.user.username}</Text>
              <Inline>
                <UserPhoto src={props.user.userphoto} style={{ margin: `0` }} />
              </Inline>
            </StyledDropdown>
          </Wrapper>
          {props.showDropdown && (
            <MenuWrapper invert>
              {options.map(option =>
                option.option !== 'Logout' ? (
                  <Option key={option.option} invert>
                    {option.option}
                  </Option>
                ) : (
                  <Option
                    isLast
                    invert
                    onClick={() => option.onClick(dispatch)}
                    key={option.option}
                  >
                    {option.option}
                  </Option>
                )
              )}
            </MenuWrapper>
          )}
        </>
      )}
    </InfoWrapper>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => UserInfoHeader.handleClickOutside,
}

export default onClickOutside(UserInfoHeader, clickOutsideConfig)
