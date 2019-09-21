import React, { useEffect, memo } from 'react'
import styled from 'styled-components'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import SEO from 'components/seo'
import Layout from 'components/layout'
import { useScroll } from 'hooks'

const StyledAccordion = styled(Accordion)`
  .accordion__item + .accordion__item {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .accordion__button {
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
  }

  .accordion__button:hover {
    background-color: #ddd;
  }

  .accordion__button:before {
    display: inline-block;
    content: '';
    height: 10px;
    width: 10px;
    margin-right: 12px;
    border-bottom: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: rotate(-45deg);
  }

  .accordion__button[aria-expanded='true']::before,
  .accordion__button[aria-selected='true']::before {
    transform: rotate(45deg);
  }

  .accordion__panel {
    padding: 20px;
    animation: fadein 0.35s ease-in;
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`

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
  display: inline-block;
`

const Button = styled.div`
  font-size: 22;
  display: inline-block;
`

const Header = styled.h3`
  font-size: 22;
  display: inline-block;
`

const TopicWrapper = styled.div``

const topics = [
  {
    header: 'Is Strove free?',
    paragraph:
      'Yes, each user gets at least 5 GB of RAM and 4 public projects in the free plan.',
  },
  {
    header: 'Why do i need to log in with Github/Gitlab/Bitbucket',
    paragraph:
      'Aforementioned providers only allow cloning if the user is logged in.',
  },
  {
    header: 'Why do i need to provide private repository access to Github',
    paragraph:
      'We initially made login with public repos by default but this approach had a serious downside. Most private repositories belong to organizations and the only way to know if a user can clone them is having private repo permissions.',
  },
  {
    header:
      'I am not able to preview my application from within the IDE even though server is running! What should I do?',
    paragraph:
      'This is most likely due to not your app not running on host 0.0.0.0. Some frameworks and servers choose a different port and you can almost always specify that you want host 0.0.0.0 instead.',
  },
  {
    header: 'Can I have more than 4 repositories?',
    paragraph: `Yes, we have a pro plan prepared for very active developers working on multiple projects. Pro plan has a limit of 12 repositories.`,
  },
  {
    header: 'Why does project load several seconds?',
    paragraph: `Giving users access to programming environment requires virtual machine access. Here is an overview of what happens when you start a new project:
1. A new Docker container is started on one of virtual machines.
2. Strove provides read and write access to the project folder.
3. Strove clones your repository from a chosen git provider.
4. Init script from strove.json is run if it's present.`,
  },
  {
    header: 'How to manage env variables?',
    paragraph:
      'Environment variables will be stored inside your project but they will not be shared as long as they are ignored by git. This works just the same way as if you were using your physical machine to code.',
  },
  {
    header: 'Can I work on mobile apps or Windows/MacOS apps?',
    paragraph: `Yes and no. Here is an overview:
Strove runs code on Linux-based virtual machines and nearly anything that works on Linux Ubuntu works on Strove as well.
Mobile development using solutions such as React Native and Expo or native desktop development using solutions such as Electorn is possible.
You won't be able to use Strove if you rely on Windows or MacOS environments. This includes working on iPhone apps using XCode.
    `,
  },
  {
    header:
      'I want a particular language version that\x27s not yet supported. What should I do to make it work?',
    paragraph:
      'Right now they only way is to contact us on contact@codengo.page. We will add it as soon as possible. We plan to add servers tailored for company needs with predefined language versions in the future.',
  },
  {
    header: 'Can I use Docker inside my project?',
    paragraph:
      'Strove.io is built using Docker and we value this technology greatly. Supporting it requires some additional work on our side but it\x27s one of the most important features on our roadmap.',
  },
  {
    header: 'Is the code secure?',
    paragraph:
      'Security of our users code is our top priority. We store projects in Google Cloud using encrypted connection to provide the best security. All the projects are run within Docker containers to make sure files used within a project are not accessible to unauthorized users. Many tech-forward companies are trying to store as much code in the cloud as possible as it\x27s easier to steal it from physical decides and this is one of the reasons we started working on Strove.io.',
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

  console.log(topicId)

  return (
    <Layout>
      <SEO title="FAQ" />
      <TextWell>
        <h1 style={{ alignSelf: 'center' }}>FAQ</h1>
        <StyledAccordion preExpanded={[topicId - 1]}>
          {topics.map((topic, index) => (
            <TopicWrapper key={topic.header}>
              <AccordionItem uuid={index}>
                {index + 1 === +topicId ? (
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <Button onClick={() => reloadPageWithHash(index + 1)}>
                        #
                      </Button>
                      <Header {...scrollHtmlAttributes}>{`${index + 1}. ${
                        topic.header
                      }`}</Header>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                ) : (
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <Button onClick={() => reloadPageWithHash(index + 1)}>
                        #
                      </Button>
                      <Header>{`${index + 1}. ${topic.header}`}</Header>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                )}
                {typeof topic.paragraph === 'string' ? (
                  topic.paragraph.split('\n').map((item, i) => (
                    <AccordionItemPanel>
                      <Paragraph key={i}>{item}</Paragraph>
                    </AccordionItemPanel>
                  ))
                ) : (
                  <AccordionItemPanel>
                    <Paragraph>{topic.paragraph}</Paragraph>
                  </AccordionItemPanel>
                )}
              </AccordionItem>
            </TopicWrapper>
          ))}
        </StyledAccordion>
      </TextWell>
    </Layout>
  )
}

export default memo(FAQ)
