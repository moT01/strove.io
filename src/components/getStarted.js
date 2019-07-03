import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { selectors } from '../state'
import Loader from './fullScreenLoader'
import { navigate } from '@reach/router'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 45%;
  margin: 5px;
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
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const LoginButton = styled.a`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 45%;
  margin: 5px;
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
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const getUserName = selectors.getData('user', null, 'name')

const getUserPhoto = selectors.getData('user', null, 'photoUrl')

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const GetStarted = () => {
  const isLoading = useSelector(selectors.getLoading('user'))
  const user = useSelector(getUserData)
  const projects = useSelector(selectors.getUserProjects)
  const [inputVisible, setInputVisible] = useState(false)

  const handleClick = () =>
    projects.length === 0
      ? console.log('User has no projects')
      : navigate('app/dashboard')

  return isLoading ? (
    <Button primary>
      <Loader isFullScreen={false} color={'#ffffff'} height={'2.5vh'} />
    </Button>
  ) : user.username ? (
    <Button primary onClick={handleClick}>
      <p style={{ margin: 0 }}>Get started</p>
    </Button>
  ) : (
    <LoginButton
      href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&redirect_uri=${REDIRECT_URI}`}
      primary
    >
      <p style={{ margin: 0 }}>Get started</p>
    </LoginButton>
  )
}
export default GetStarted
