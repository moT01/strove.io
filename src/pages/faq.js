import React, { useEffect } from 'react'
import styled from 'styled-components'

import SEO from 'components/seo'
import Layout from 'components/layout'
import { useScroll } from '../hooks'

const TextWell = styled.div`
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
`
const Paragraph = styled.p`
  text-indent: 50px;
  font-size: 20px;
  height: 200px;
`

const Header = styled.h2``

const TopicWrapper = styled.div``

const topics = [
  {
    header: '1. Why 4 repos?',
    paragraph: 'Why not',
  },
  {
    header: '2. Is free?',
    paragraph: 'Yes, no, yes... maybe',
  },
  {
    header: '3. Why does project load seceral seconds',
    paragraph: 'Because your internet conection is poor',
  },
  {
    header: '4. Why do i need to log in with Github/Gitlab',
    paragraph: 'Yes',
  },

  {
    header: '5. Why SiliSky might not be for you.',
    paragraph: 'Because you are breath taking!',
  },

  {
    header: '6. How to manage env variables?',
    paragraph: 'Hello',
  },
  {
    header: '7. Why is my project loading?',
    paragraph: 'I do not know ask Adam',
  },

  {
    header: '8. I want seelsd?????? language version what to do',
    paragraph: ' Hello, how are you?',
  },
  {
    header: '9. HOST 0.0.0.0',
    paragraph: 'Yyyyyyyyyyyy',
  },
]

const FAQ = () => {
  const [executeScroll, scrollHtmlAttributes] = useScroll()
  const topicId =
    window?.location?.href?.match(/#(.*)/) &&
    window.location.href.match(/#(.*)/)[1]

  useEffect(executeScroll, [])

  return (
    <Layout>
      <SEO title="FAQ" />
      <TextWell>
        <h1 style={{ alignSelf: 'center' }}>FAQ</h1>
        {topics.map((topic, index) => (
          <TopicWrapper>
            {index + 1 == topicId ? (
              <Header {...scrollHtmlAttributes}>{topic.header}</Header>
            ) : (
              <Header>{topic.header}</Header>
            )}
            <Paragraph>{topic.paragraph}</Paragraph>
          </TopicWrapper>
        ))}
      </TextWell>
    </Layout>
  )
}

export default FAQ
