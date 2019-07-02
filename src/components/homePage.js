import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Location } from '@reach/router'
import Loader from './fullScreenLoader'
import SEO from 'components/seo'
import Layout from 'components/layout'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const PageWrapper = styled(Wrapper)`
  width: 100vw;
  height: auto;
`

const GithubLinkWrapper = styled(Wrapper)`
  width: 50vw;
  height: 10vh;
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: auto;
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

const HomepageComponent = () => {
  return (
    <Layout>
      <SEO title="Homepage" />
      <PageWrapper>
        <GithubLinkWrapper>
          <Button primary>Start your project</Button>
        </GithubLinkWrapper>
      </PageWrapper>
    </Layout>
  )
}

const Homepage = () => (
  <Location>
    {({ location }) => <HomepageComponent location={location} />}
  </Location>
)

export default Homepage
