import React, { useEffect } from 'react'
import styled from 'styled-components'

import SEO from 'components/seo'
import Layout from 'components/layout'
import { useScroll } from '../hooks'

const TextWell = styled.div`
  ${'' /* align-self: center; */}
  color: black;
  height: auto;
  width: 60vw;
  margin: 0vw 7.5vw 0 7.5vw;
  padding: 3vh;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: left;
  text-justify: inter-word;
  background-color: white;
  ${'' /* border: 1px solid slategrey; */}
`
const Paragraph = styled.p`
  text-indent: 50px;
  font-size: 20px;
  height: 200px;
`

const Header = styled.h2``

const FAQ = () => {
  const [executeScroll, scrollHtmlAttributes] = useScroll()
  useEffect(executeScroll, [])

  return (
    <Layout>
      <SEO title="FAQ" />
      <TextWell>
        <h1 style={{ alignSelf: 'center' }}>FAQ</h1>
        <Header>#1 Why 4 repos?</Header>
        <Paragraph>Why not</Paragraph>
        <Header>#2 Is free?</Header>
        <Paragraph>Yes, no, yes... maybe</Paragraph>
        <Header>#3 Why does project load seceral seconds</Header>
        <Paragraph>Because your internet conection is poor</Paragraph>
        <Header {...scrollHtmlAttributes}>
          4# Why do i need to log in with Github/Gitlab
        </Header>
        <Paragraph>Yes</Paragraph>
        <Header>#5 Why SiliSky might not be for you.</Header>
        <Paragraph>Because you are breath taking!</Paragraph>
        <Header>#6 How to manage env variables?</Header>
        <Paragraph>Hello</Paragraph>
        <Header>#7 Why is my project loading?</Header>
        <Paragraph>I don't know ask Adam</Paragraph>
        <Header>#8 I want seelsd?????? language version what to do</Header>
        <Paragraph>Hello, how are you?</Paragraph>
        <Header>#9 HOST 0.0.0.0</Header>
        <Paragraph>Yyyyyyyyyyyy</Paragraph>
      </TextWell>
    </Layout>
  )
}

export default FAQ
