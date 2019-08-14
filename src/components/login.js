import React, { useState, memo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import Downshift from 'downshift'

import { selectors } from 'state'
import UserInfoHeader from 'components/userInfoHeader'
import {
  Github,
  //  Bitbucket,
  Gitlab,
} from '../images/logos'
import { persistor } from '../../wrapper'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITLAB_CLIENT_ID = process.env.GITLAB_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI

const options = [
  {
    option: 'Logout',
    onClick: dispatch => {
      persistor.purge()
      localStorage.removeItem('token')
      dispatch({
        type: 'LOGOUT',
      })
    },
  },
]

const loginOptions = [
  {
    value: 'github',
    label: 'Github',
    href: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,repo&state=github`,
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

const LoginButton = styled.button`
  font-size: 1.2rem;
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
  font-weight: 200;

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
  border-radius: 5px;
  border-width: 1px;
  border-color: #0072ce;
  border-style: solid;
  background-color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
  z-index: 3;
  left: -2vw;
  position: relative;
  @media (max-width: 1365px) {
    left: -6vw;
  }
`

const Option = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.2vh`)};
  width: auto;
  height: auto;
  /* position: absolute;
  top: 25px; */
  font-size: 1.2rem;
  color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
  border-bottom-left-radius: ${props => props.isLast && '5px'};
  border-bottom-right-radius: ${props => props.isLast && '5px'};
  z-index: 4;
  text-decoration: none;
  font-weight: 200;

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
`

const getUserName = selectors.api.getApiData('user', null, 'name')

const getUserPhoto = selectors.api.getApiData('user', null, 'photoUrl')

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

const Login = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const isLoading = useSelector(selectors.api.getLoading('user'))

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

export default memo(Login)
