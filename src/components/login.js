import React, { PureComponent } from "react"
import {
  Loading,
  Avatar,
  Logo,
  Logotype,
  Container,
  Header,
} from "gitstar-components"
import gql from "graphql-tag"

import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  uri: process.env.SILISKY_ENDPOINT,
  fetch,
})

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  FINISHED_LOADING: "finished_loading",
  AUTHENTICATED: "authenticated",
}

class Login extends PureComponent {
  state = {
    status: STATUS.INITIAL,
    token: null,
  }

  componentDidMount() {
    const { location } = this.props
    // const code = location.match(/?code=(.*)/) && location.match(/?code=(.*)/)[1]
    const code = location
    console.log("code", code)
    const storedToken = localStorage.getItem("githubToken")
    if (true) {
      const GITHUB_LOGIN = gql`
        mutation GithubAuth($code: String!) {
          githubAuth(code: $code) {
            email
          }
        }
      `
      const auth = async () => {
        try {
          const {
            data: { githubAuth },
          } = await client.mutate({
            mutation: GITHUB_LOGIN,
            variables: code,
          })
          console.log("githubAuth", githubAuth)
        } catch (e) {
          console.log(e)
        }
      }
      auth()
      this.setState({
        // token: storedToken,
        status: STATUS.AUTHENTICATED,
      })
    }

    // const code =
    //   window.location.href.match(/?code=(.*)/) &&
    //   window.location.href.match(/?code=(.*)/)[1]
    // if (code) {
    //   this.setState({ status: STATUS.LOADING })

    //   fetch(`${AUTH_API_URI}${code}`)
    //     .then(response => response.json())
    //     .then(({ token }) => {
    //       localStorage.setItem("github_token", token)
    //       this.setState({
    //         token,
    //         status: STATUS.FINISHED_LOADING,
    //       })
    //     })
    // }
  }

  render() {
    return (
      <a
        // style={{
        //   display: this.state.status === STATUS.INITIAL ? "inline" : "none",
        // }}
        href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&redirect_uri=${REDIRECT_URI}`}
      >
        Login with Github
      </a>
    )
  }
}

export default Login
