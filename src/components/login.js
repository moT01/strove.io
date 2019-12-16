import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { createSelector } from 'reselect'
import Downshift from 'downshift'
import { useDispatch, useSelector } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import DetectBrowser from 'react-detect-browser'

import { selectors } from 'state'
import { loginOptions } from 'consts'

import FullScreenLoader from './fullScreenLoader'
import { persistor } from 'wrapper'
import { getWindowPathName } from 'utils'

const LoginButton = styled.button`
  color: ${({ theme }) => theme.colors.c2};
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: 'relative';
  background: none;
  border: none;
  text-decoration: none;
  font-weight: 300;
  line-height: 1;
  padding: 0;
  height: 3vh;
  cursor: pointer;

  :focus {
    outline: 0;
  }

  span {
    color: ${({ theme }) => theme.colors.c2};
  }

  :hover {
    color: ${({ theme }) => theme.colors.c3};
  }

  > {
    vertical-align: bottom;
  }
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: auto;
  box-shadow: 0 1.2vh 1.2vh -1.5vh ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-style: solid;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
  z-index: 3;
  position: relative;
`

const Option = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.2vh`)};
  width: auto;
  height: 32px;
  font-size: 1.2rem;
  border-bottom-left-radius: ${props => props.isLast && '3px'};
  border-bottom-right-radius: ${props => props.isLast && '3px'};
  z-index: 4;
  text-decoration: none;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.c1};

  svg {
    fill: ${({ theme, invert }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    width: 2.2vh;
    height: auto;
    margin-right: 5px;
  }

  :hover {
    background-color: ${({ theme, invert }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.c2};
  }

  :hover svg {
    fill: ${({ theme, invert }) =>
      invert ? theme.colors.c2 : theme.colors.c1};
    cursor: pointer;
  }
`

const Inline = styled.div`
  display: inline-block;
  width: ${props =>
    props.mobile ? '5.5vh' : props.isEmbed ? '18px' : '2.7vh'};
  height: ${props =>
    props.mobile ? '5.5vh' : props.isEmbed ? '18px' : '2.7vh'};
  margin-left: 4px;
  background: ${({ theme }) => theme.colors.c1};
`

const UserPhoto = styled.img`
  width: 100%;
  height: 100%;
  margin-left: 4px;
  border-radius: 5px;
  margin: 0;
`

const Text = styled.h3`
  font-size: ${props => (props.isEmbed ? '18px' : '1.2rem')};
  margin: 0;
  font-weight: 300;
  line-height: 1;
  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
  :hover {
    color: ${({ theme }) => theme.colors.c3};
    cursor: pointer;
  }
`

const OptionText = styled(Text)`
  font-weight: 300;
  :hover {
    color: ${({ theme }) => theme.colors.c2};
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 3vh;
  width: auto;
  margin: 0;
  background: none;
`

const StyledDropdown = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  height: 3vh;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.c1};
`

const DropdownWrapper = styled.div`
  position: absolute;
  background: none;
  right: 1.5vw;
`

const getUserName = selectors.api.getUserField('name')

const getUserPhoto = selectors.api.getUserField('photoUrl')

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const LoginDropdown = () => {
  const isEmbed = getWindowPathName().includes('embed')

  return (
    <Downshift>
      {({ getToggleButtonProps, isOpen }) => (
        <div>
          <LoginButton {...getToggleButtonProps({})}>
            <Text isEmbed={isEmbed}>Login</Text>
          </LoginButton>
          <DropdownWrapper hidden={!isOpen}>
            <MenuWrapper invert>
              {loginOptions.map((item, index) => (
                <Option
                  invert
                  key={item.value}
                  href={item.href}
                  isLast={index === loginOptions.length - 1 ? true : false}
                >
                  {item.icon}
                  <OptionText invert>{item.label}</OptionText>
                </Option>
              ))}
            </MenuWrapper>
          </DropdownWrapper>
        </div>
      )}
    </Downshift>
  )
}

const UserDropdown = props => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectors.api.getLoading('user'))
  const isEmbed = getWindowPathName().includes('embed')

  if (isLoading)
    return (
      <FullScreenLoader isFullscreen={false} height="3vh" color="#ffffff" />
    )

  return (
    <Downshift>
      {({ getToggleButtonProps, isOpen }) => (
        <span>
          <Wrapper {...getToggleButtonProps({})}>
            <StyledDropdown>
              {!isMobileOnly && (
                <Text isEmbed={isEmbed}>{props.user.username}</Text>
              )}
              <Inline mobile={isMobileOnly} isEmbed={isEmbed}>
                <UserPhoto src={props.user.userphoto} />
              </Inline>
            </StyledDropdown>
          </Wrapper>
          <DropdownWrapper hidden={!isOpen}>
            <MenuWrapper invert>
              <Option
                isLast
                onClick={() => {
                  persistor.purge()
                  localStorage.removeItem('token')
                  dispatch({
                    type: 'LOGOUT',
                  })
                }}
                invert
              >
                <OptionText invert>Logout</OptionText>
              </Option>
            </MenuWrapper>
          </DropdownWrapper>
        </span>
      )}
    </Downshift>
  )
}

const Login = ({ browser }) => {
  const isLoading = useSelector(selectors.api.getLoading('user'))
  const user = useSelector(getUserData)

  return !user.username && !isLoading ? (
    <LoginDropdown browser={browser} />
  ) : (
    <UserDropdown user={user} browser={browser} />
  )
}

const LoginWithBrowserInfo = () => (
  <DetectBrowser>{({ browser }) => <Login browser={browser} />}</DetectBrowser>
)

export default memo(LoginWithBrowserInfo)
