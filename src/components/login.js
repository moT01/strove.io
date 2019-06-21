import React, { PureComponent, useState, useEffect } from "react"
import gql from "graphql-tag"
import { Location } from "@reach/router"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"

import { mutate } from "../utils"
import { GITHUB_LOGIN } from "../queries"

import Dropdown from "../components/dropdown"

const options = [
  { option: "Settings" },
  { option: "Kill yoursef" },
  { option: "Logout" },
]

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  FINISHED_LOADING: "finished_loading",
  AUTHENTICATED: "authenticated",
}

const Text = styled.span`
  font-size: 3vh;
  color: white;
  @media (max-width: 1366px) {
    font-size: 2.5vh;
  }
`

const LinkWrapper = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4vh;
  margin: 0;
`

const ZeldaWrapper = styled(LinkWrapper)`
  height: 4vh;
  flex-direction: column;
  overflow: visible;
`

const LoginButton = styled.a`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  span {
    color: white;
  }

  ${GithubLogo} {
    fill: white;
  }

  :hover {
    color: black;
    text-decoration: none;

    span {
      color: black;
    }

    ${GithubLogo} {
      fill: black;
    }
  }

  * {
    vertical-align: bottom;
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
`

const GithubLogo = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    version="1.1"
    {...props}
  >
    <path
      d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
      fill="var(--geist-foreground)"
      fill-rule="nonzero"
    />
  </svg>
)

const getUserName = state => state.fetch.user.data && state.fetch.user.data.name

const getUserPhoto = state =>
  state.fetch.user.data && state.fetch.user.data.photoUrl

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const LoginComponent = ({ location }) => {
  const [status, setStatus] = useState(STATUS.INITIAL)
  const [showDropdown, setShowDropdown] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector(getUserData)
  console.log("user", user)

  useEffect(() => {
    const code =
      location.search.match(/code=(.*)/) &&
      location.search.match(/code=(.*)/)[1]
    const storedToken = localStorage.getItem("githubToken")
    if (code) {
      dispatch(
        mutate({
          mutation: GITHUB_LOGIN,
          variables: { code },
          mutationName: "githubAuth",
          storeName: "user",
        })
      )

      setStatus(STATUS.AUTHENTICATED)
    }
  }, [])

  return !user.username ? (
    <LoginButton
      href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&redirect_uri=${REDIRECT_URI}`}
    >
      <Text>Login </Text>
      <Inline>
        <GithubLogo width="100%" height="auto" />
      </Inline>
    </LoginButton>
  ) : (
    <ZeldaWrapper>
      <LinkWrapper onClick={() => setShowDropdown(!showDropdown)}>
        <Text>{user.username}</Text>
        <Inline>
          <UserPhoto src={user.userphoto} style={{ margin: `0` }} />
        </Inline>
      </LinkWrapper>
      {showDropdown && <Dropdown options={options} />}
    </ZeldaWrapper>
  )
}

const Login = () => (
  <Location>
    {({ location }) => <LoginComponent location={location} />}
  </Location>
)

export default Login
