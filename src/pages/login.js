import React, { PureComponent } from "react"

import {
  STATUS,
  Loading,
  Avatar,
  Logo,
  Logotype,
  Container,
  Header,
} from "gitstar-components"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

/* Todo: Change once app is up */
const REDIRECT_URI = "http://localhost:8000/"

const SectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 93vh;
`

class Login extends PureComponent {
  state = {
    status: STATUS.INITIAL,
    token: null,
  }
  render() {
    return (
      <Layout>
        <SEO title="Preview" />
        <SectionWrapper>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${
              process.env.GITHUB_CLIENT_ID
            }&scope=user&redirect_uri=${REDIRECT_URI}`}
          >
            Login
          </a>
        </SectionWrapper>
      </Layout>
    )
  }
}

export default Login
