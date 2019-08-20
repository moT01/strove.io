import React, { useState, memo } from 'react'
import styled from 'styled-components'
import { createSelector } from 'reselect'
import Downshift from 'downshift'
import { useDispatch, useSelector } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import DetectBrowser from 'react-detect-browser'

import Loader from 'components/fullScreenLoader'
import { selectors } from 'state'
import { Github, Bitbucket, Gitlab } from '../images/logos'
import { persistor } from '../../wrapper'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITLAB_CLIENT_ID = process.env.GITLAB_CLIENT_ID
const BITBUCKET_CLIENT_ID = process.env.BITBUCKET_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI

const loginOptions = [
  {
    value: 'github',
    label: 'Github',
    href: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,repo&state=github`,
    icon: <Github />,
  },
  {
    value: 'bitbucket',
    label: 'Bitbucket',
    href: `https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket`,
    icon: <Bitbucket />,
  },
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
  line-height: 1;

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

  > {
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
  left: ${props => (props.login ? '-2vw' : '50px')};
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
  height: 32px;
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

const Text = styled.h3`
  font-size: 1.2rem;
  color: white;
  transition: color 0.3s;
  margin: 0;
  font-weight: 200;
  line-height: 1;
  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
  :hover {
    color: black;
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
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #0072ce;
`

const getUserName = selectors.api.getApiData('user', null, 'name')

const getUserPhoto = selectors.api.getApiData('user', null, 'photoUrl')

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const LoginDropdown = props => {
  return (
    <Downshift>
      {({ getToggleButtonProps, isOpen }) => (
        <span>
          <LoginButton {...getToggleButtonProps({})}>Login</LoginButton>
          <div
            hidden={!isOpen}
            style={{
              position: 'absolute',
              background: 'none',
              right: props.browser === 'safari' ? '-30px' : '60px',
            }}
          >
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

const UserDropdown = props => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectors.api.getLoading('user'))

  if (isLoading)
    return <Loader isFullscreen={false} height={'3vh'} color={'#ffffff'} />

  return (
    <Downshift>
      {({ getToggleButtonProps, isOpen }) => (
        <span>
          <Wrapper {...getToggleButtonProps({})}>
            <StyledDropdown>
              <Text>{props.user.username}</Text>
              <Inline mobile={isMobileOnly}>
                <UserPhoto src={props.user.userphoto} style={{ margin: `0` }} />
              </Inline>
            </StyledDropdown>
          </Wrapper>
          <div
            hidden={!isOpen}
            style={{
              position: 'absolute',
              background: 'none',
              right: props.browser === 'safari' ? '-30px' : '60px',
            }}
          >
            <MenuWrapper invert>
              <Option
                onClick={() => {
                  persistor.purge()
                  localStorage.removeItem('token')
                  dispatch({
                    type: 'LOGOUT',
                  })
                }}
                invert
              >
                Logout
              </Option>
            </MenuWrapper>
          </div>
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
