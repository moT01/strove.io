import React, { useState, memo } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/fullScreenLoader'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 8vw;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  border-radius: 5px;
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

const Text = styled.h3`
  font-size: 1.2rem;
  color: white;
  transition: color 0.3s;
  margin: 0;
  font-weight: 200;
  @media (max-width: 767px) {
    font-size: 1.4rem;
  }

  :hover {
    color: black;
  }
`

const Inline = styled.div`
  display: inline-block;
  width: ${props => (props.mobile ? '5.5vh' : '2.7vh')};
  height: ${props => (props.mobile ? '5.5vh' : '2.7vh')};
  margin-left: 4px;
`

const UserPhoto = styled.img`
  width: 100%;
  height: 100%;
  margin-left: 4px;
  border-radius: 5px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 3vh;
  width: auto;
  margin: 0;
  position: relative;
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
  padding-right: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.1vh`)};
  width: 100%;
  height: auto;
  min-height: 30px;
  font-size: 1rem;
  color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
  border-bottom-left-radius: ${props => props.isLast && '5px'};
  border-bottom-right-radius: ${props => props.isLast && '5px'};
  z-index: 2;
  position: absolute;

  :hover {
    background-color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
    cursor: pointer;
  }
  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`

const UserInfoHeader = props => {
  const [options] = useState(props.options)
  const dispatch = useDispatch()
  const isLoading = useSelector(selectors.api.getLoading('user'))

  UserInfoHeader.handleClickOutside = () => props.handleDropdown()

  return (
    <InfoWrapper>
      {isLoading ? (
        <Loader isFullscreen={false} height={'3vh'} color={'#ffffff'} />
      ) : (
        <>
          <Wrapper onClick={props.handleDropdownClick}>
            <StyledDropdown>
              <Text>{props.user.username}</Text>
              <Inline mobile={isMobileOnly}>
                <UserPhoto src={props.user.userphoto} style={{ margin: `0` }} />
              </Inline>
            </StyledDropdown>
          </Wrapper>
          {props.showDropdown && (
            <MenuWrapper invert>
              {options.map(option => (
                <Option
                  // isLast
                  invert
                  onClick={() => option.onClick(dispatch)}
                  key={option.option}
                >
                  {option.option}
                </Option>
              ))}
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

export default memo(onClickOutside(UserInfoHeader, clickOutsideConfig))
