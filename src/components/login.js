import React, { useState } from 'react'
import { Location } from '@reach/router'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import Downshift from 'downshift'

import { selectors } from 'state'
import UserInfoHeader from 'components/userInfoHeader'
import { logout } from './login/actions'

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

const Text = styled.span`
  transition: color 0.15s;
  font-size: 3vh;
  color: white;
  @media (max-width: 1366px) {
    font-size: 2.5vh;
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  min-width: 70px;
  max-width: 150px;
  margin-right: 5vw;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  ${'' /* animation: ${FadeIn} 1s ease-out; */}
  opacity: 0.9;
  :focus {
    outline: 0;
  }

  &:hover {
    opacity: 1;
    box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
    transform: translateY(-1px);
  }
`

const LoginButton = styled.a`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 3vw;

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

const Logo = styled.svg`
  transition: fill 0.15s;
  width: 100%;
  height: auto;
  fill: #ffffff;

  ${LoginButton}:hover & {
    fill: #000000;
  }
`

const Inline = styled.div`
  display: inline-block;
  width: 4vh;
  height: auto;
  margin-left: 4px;
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

const Dropdown = () => {
  const [value, setValue] = useState()
  const label = 'Login'

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
        <div>
          <Button
            style={{ position: 'relative' }}
            {...getToggleButtonProps({})}
          >
            Login
          </Button>

          <div hidden={!isOpen} style={{ position: 'absolute' }}>
            <MenuWrapper invert>
              {loginOptions.map(item => (
                <Option invert key={item.value} href={item.href}>
                  {item.label}
                </Option>
              ))}
            </MenuWrapper>
          </div>
        </div>
      )}
    </Downshift>
  )
}

const LoginComponent = ({ location }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const isLoading = useSelector(selectors.getLoading('user'))

  const handleDropdown = () => setShowDropdown(false)
  const handleDropdownClick = () => setShowDropdown(!showDropdown)
  const user = useSelector(getUserData)

  return !user.username && !isLoading ? (
    //   <LoginButton
    //     href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo`}
    //   >
    //     <Text>Login </Text>
    //     <Inline>
    //       <Logo viewBox="0 0 15 15">
    //         <path d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z" />
    //       </Logo>
    //     </Inline>
    //   </LoginButton>
    // ) : (
    //   <UserInfoHeader
    //     user={user}
    //     options={options}
    //     handleDropdown={handleDropdown}
    //     showDropdown={showDropdown}
    //     handleDropdownClick={handleDropdownClick}
    //   />
    <Dropdown />
  ) : (
    <Dropdown />
  )
}

const Login = () => (
  <Location>
    {({ location }) => <LoginComponent location={location} />}
  </Location>
)

export default Login
