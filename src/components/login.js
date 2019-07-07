import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import Downshift from 'downshift'

import { selectors } from 'state'
import UserInfoHeader from 'components/userInfoHeader'

const logout = {
  type: 'LOGOUT',
}

const options = [
  { option: 'Settings' },
  {
    option: 'Logout',
    onClick: dispatch => {
      localStorage.removeItem('token')
      dispatch(logout)
    },
  },
]

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID

const LoginButton = styled.button`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 3vw;
  position: 'relative';
  background: none;
  border: none;

  span {
    color: white;
  }

  :hover {
    color: black;
    text-decoration: none;

    span {
      color: black;
    }
  }

  * {
    vertical-align: bottom;
  }
`

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
  left: -5vw;
  position: absolute;
  @media (max-width: 1366px) {
    width: auto;
  }
`

const Option = styled.a`
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
  z-index: 4;

  :hover {
    background-color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
    cursor: pointer;
  }
  @media (max-width: 1366px) {
    font-size: 2vh;
  }
`

const getUserName = selectors.getApiData('user', null, 'name')

const getUserPhoto = selectors.getApiData('user', null, 'photoUrl')

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const loginOptions = [
  {
    value: 'github',
    label: 'Github login',
    href: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo`,
  },
  {
    value: 'bitbucker',
    label: 'Bitbucket login',
    href: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo`,
  },
]

const LoginDropdown = () => {
  const [value, setValue] = useState()

  const selectedItem =
    options.find(i => {
      return String(i.value) === value
    }) || null
  return (
    <Downshift selectedItem={selectedItem} onChange={item => setValue(item)}>
      {({
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        selectedItem,
        highlightedIndex,
      }) => (
        <span>
          <LoginButton {...getToggleButtonProps({})}>Login</LoginButton>

          <div hidden={!isOpen} style={{ position: 'absolute' }}>
            <MenuWrapper invert>
              {loginOptions.map(item => (
                <Option invert key={item.value} href={item.href}>
                  {item.label}
                </Option>
              ))}
            </MenuWrapper>
          </div>
        </span>
      )}
    </Downshift>
  )
}

const Login = props => {
  const [showDropdown, setShowDropdown] = useState(false)
  const isLoading = useSelector(selectors.getLoading('user'))

  const handleDropdown = () => setShowDropdown(false)
  const handleDropdownClick = () => setShowDropdown(!showDropdown)
  const user = useSelector(getUserData)

  return !user.username && !isLoading ? (
    <LoginDropdown />
  ) : (
    <UserInfoHeader
      user={user}
      options={options}
      handleDropdown={handleDropdown}
      showDropdown={showDropdown}
      handleDropdownClick={handleDropdownClick}
    />
  )
}

export default Login
