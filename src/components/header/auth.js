import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components/macro'
import { createSelector } from 'reselect'
import Downshift from 'downshift'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import { selectors } from 'state'
import { loginOptions } from 'consts'
import { persistor } from '../../wrapper'
import StroveLogo from 'images/stroveReversed.png'

import DropdownMenuWrapper from './dropdownMenuWrapper'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  font-weight: 300;
  animation: ${FadeIn} 0.3s ease-out;
  cursor: pointer;
  min-width: 40px;
  @media (max-width: 767px) {
    height: 100%;
  }
`

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
  line-height: 1;
  padding: 0;
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

const OptionStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 2px`)};
  width: auto;
  height: 32px;
  font-size: 16px;
  border-bottom-left-radius: ${props => props.isLast && '3px'};
  border-bottom-right-radius: ${props => props.isLast && '3px'};
  z-index: 4;
  text-decoration: none;
  transition: color 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.c1};

  svg {
    fill: ${({ theme }) => theme.colors.c1};
    width: 22px;
    height: 100%;
    margin-right: 5px;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.c1};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.c2};
  }

  :hover svg {
    fill: ${({ theme }) => theme.colors.c2};
    cursor: pointer;
  }
`

const Option = styled.a`
  ${OptionStyles}
`

const LinkOption = styled(Link)`
  ${OptionStyles}
`

const Inline = styled.div`
  display: flex;
  width: ${props => (props.isEditor ? '18px' : '40px')};
  height: ${props => (props.isEditor ? '18px' : '40px')};
  margin: 0px 4px;
  background: ${({ theme }) => theme.colors.c1};
`

const UserPhoto = styled.img`
  width: 100%;
  height: 100%;
  margin-left: 4px;
  border-radius: 5px;
  margin: 0;
`

const Text = styled.div`
  font-size: 16px;
  margin: 0;
  font-weight: ${props => (props.isEditor ? '300' : '600')};
  line-height: 1;
  padding: 6px;
  :hover {
    color: ${({ theme }) => theme.colors.c3};
    cursor: pointer;
  }
`

const AuthText = styled(Text)`
  border: 1px solid white;
  border-radius: 6px;
  border-width: 1px;
  :hover {
    cursor: pointer;
    border-color: black;
  }
`

const OptionText = styled(Text)`
  :hover {
    color: ${({ theme }) => theme.colors.c2};
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  margin: 0;
  background: none;
`

const StyledDropdown = styled.div`
  color: ${({ theme }) => theme.colors.c2};
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
  margin-top: 5px;
`

const getUserName = selectors.api.getUserField('name')

const getUserPhoto = selectors.api.getUserField('photoUrl')

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const StyledAntdIcon = styled(Icon)`
  align-items: center;
  display: flex;
  margin: 0px 4px;
`

const LoginDropdown = props => (
  <AuthWrapper>
    <Downshift>
      {({ getToggleButtonProps, isOpen }) => (
        <div>
          <LoginButton {...getToggleButtonProps({})}>
            <AuthText {...props}>Login</AuthText>
          </LoginButton>
          <DropdownWrapper hidden={!isOpen}>
            <DropdownMenuWrapper>
              {loginOptions.map((item, index) => (
                <Option
                  key={item.value}
                  href={item.href}
                  isLast={index === loginOptions.length - 1 ? true : false}
                >
                  {item.icon}
                  <OptionText>{item.label}</OptionText>
                </Option>
              ))}
            </DropdownMenuWrapper>
          </DropdownWrapper>
        </div>
      )}
    </Downshift>
  </AuthWrapper>
)

const UserDropdown = props => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectors.api.getLoading('user'))

  if (isLoading) {
    return null
  }

  return (
    <AuthWrapper>
      <Downshift>
        {({ getToggleButtonProps, isOpen }) => (
          <div>
            <Wrapper {...getToggleButtonProps({})}>
              <StyledDropdown {...props}>
                {!props.isEditor && !props.isMobileOnly && (
                  <Text {...props}> {props.user.username}</Text>
                )}
                <Inline {...props}>
                  <UserPhoto
                    src={
                      props.user.userphoto ? props.user.userphoto : StroveLogo
                    }
                  />

                  <StyledAntdIcon type="caret-down" />
                </Inline>
              </StyledDropdown>
            </Wrapper>
            <DropdownWrapper hidden={!isOpen}>
              <DropdownMenuWrapper>
                <LinkOption to="/app/plans">
                  <OptionText>Settings</OptionText>
                </LinkOption>
                <Option
                  isLast
                  onClick={() => {
                    persistor.purge()
                    localStorage.removeItem('token')
                    dispatch({
                      type: 'LOGOUT',
                    })
                  }}
                >
                  <OptionText>Logout</OptionText>
                </Option>
              </DropdownMenuWrapper>
            </DropdownWrapper>
          </div>
        )}
      </Downshift>
    </AuthWrapper>
  )
}

const Auth = props => {
  const user = useSelector(getUserData)

  if (
    window.location.pathname.includes('/embed/') ||
    window.location.pathname.includes('/app/editor')
  ) {
    return null
  }

  return !user.username ? (
    <LoginDropdown {...props} />
  ) : (
    <UserDropdown user={user} {...props} />
  )
}

export default memo(Auth)
