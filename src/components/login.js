import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import Downshift from 'downshift'

import { selectors } from 'state'
import UserInfoHeader from 'components/userInfoHeader'
import { Github, Bitbucket, Gitlab } from '../images/logos'

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

const loginOptions = [
  {
    value: 'github',
    label: 'Github',
    href: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github`,
    icon: <Github />,
  },
  // {
  //   value: 'bitbucket',
  //   label: 'Bitbucket',
  //   href: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo`,
  //   icon: <Bitbucket />,
  // },
  {
    value: 'gitlab',
    label: 'Gitlab',
    href: `https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=gitlab`,
    icon: <Gitlab />,
  },
]

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITLAB_CLIENT_ID = process.env.GITLAB_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI

const LoginButton = styled.button`
  font-size: 3vh;
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: 'relative';
  background: none;
  border: none;
  text-decoration: none;

  :focus {
    outline: 0;
  }

  span {
    color: white;
  }

  :hover {
    color: black;

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
  width: auto;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  border-radius: 10px;
  border-width: 1px;
  border-color: #0072ce;
  border-style: solid;
  background-color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
  z-index: 3;
  left: -2.5vw;
  position: absolute;
  @media (max-width: 1366px) {
    width: auto;
  }
`

const Option = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-tems: center;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.2vh`)};
  width: 8vw;
  height: auto;
  font-size: 2.2vh;
  color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
  border-bottom-left-radius: ${props => props.isLast && '8px'};
  border-bottom-right-radius: ${props => props.isLast && '8px'};
  z-index: 4;
  text-decoration: none;

  svg {
    fill: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    width: 2.2vh;
    height: auto;
    margin-right: 5px;
  }

  :hover {
    background-color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
    cursor: pointer;
  }

  :hover svg {
    fill: ${props => (props.invert ? '#ffffff' : '#0072ce')};
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
              {loginOptions.map((item, index) => (
                <Option
                  invert
                  key={item.value}
                  href={item.href}
                  isLast={index === loginOptions.length - 1 ? true : false}
                >
                  {item.icon}

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
