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
`

const Button = styled.div`
  height: 20px;
  width: 20px;
  border: 1px solid red;
`

const Header = styled.h2``

const TopicWrapper = styled.div``

const topics = [
  {
    header: 'Is free?',
    paragraph: 'Yes, no, yes... maybe',
  },
  {
    header: 'Can I have more than 4 repositories?',
    paragraph: `Yes, we have a pro plan prepared to very active developers working on multiple projects.`,
  },
  {
    header: 'Why does project load several seconds',
    paragraph: `Giving users access to programming environment requires virtual machine access. Here is an overview of what happens when you start a new project:
1. A new Docker container is started on one of our virtual machines.
2. Silisky provides read and write access to the project folder.
3. Silisky clones your repository from a chosen git provider.
4. Init script from silisky.json is run if it's present.
    `,
  },
  {
    header: 'Why do i need to log in with Github/Gitlab',
    paragraph: 'Yes',
  },

  {
    header: 'Why SiliSky might not be for you.',
    paragraph: 'Because you are breath taking!',
  },

  {
    header: 'How to manage env variables?',
    paragraph: 'Hello',
  },
  {
    header: 'Why is my project loading?',
    paragraph: 'I do not know ask Adam',
  },

  {
    header: 'I want seelsd?????? language version what to do',
    paragraph: ' Hello, how are you?',
  },
  {
    header: 'HOST 0.0.0.0',
    paragraph: 'Yyyyyyyyyyyy',
  },
]

const FAQ = () => {
  const [executeScroll, scrollHtmlAttributes] = useScroll()
  const topicId =
    window?.location?.href?.match(/#(.*)/) &&
    window.location.href.match(/#(.*)/)[1]

  const reloadPageWithHash = index => {
    window.location.replace('http://localhost:8000/faq#' + index)
  }

  useEffect(() => {
    topicId && executeScroll()
  }, [topicId])

  return (
    <Layout>
      <SEO title="FAQ" />
      <TextWell>
        <h1 style={{ alignSelf: 'center' }}>FAQ</h1>
        {topics.map((topic, index) => (
          <TopicWrapper key={topic.header}>
            {index + 1 === +topicId ? (
              <>
                <Header {...scrollHtmlAttributes}>{`${index + 1}. ${
                  topic.header
                }`}</Header>
                <Button onClick={() => reloadPageWithHash(index + 1)}>
                  Click
                </Button>
              </>
            ) : (
              <>
                <Header {...scrollHtmlAttributes}>{`${index + 1}. ${
                  topic.header
                }`}</Header>
                <Button onClick={() => reloadPageWithHash(index + 1)}>
                  Click
                </Button>
              </>
            )}
            <Paragraph>
              {topic.paragraph.split('\n').map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </Paragraph>
          </TopicWrapper>
        ))}
      </TextWell>
    </Layout>
  )
}

export default FAQ
