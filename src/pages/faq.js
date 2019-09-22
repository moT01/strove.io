import React, { memo } from 'react'
import styled from 'styled-components'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { isMobile } from 'react-device-detect'

import SEO from 'components/seo'
import Layout from 'components/layout'

const StyledAccordion = styled(Accordion)`
  .accordion__item + .accordion__item {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .accordion__button {
    position: relative;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
  }

  .accordion__button:hover {
    background-color: #efefef;
  }

  .accordion__panel {
    padding: 0 20px 30px;
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
  width: ${isMobile ? '100vw' : '60vw'};
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
  text-indent: 30px;
  font-size: 20px;
  display: inline-block;
  padding-top: 0;
`

const Header = styled.h3`
  font-size: 22;
  display: inline-block;
`

const topics = [
  {
    header: 'Is Strove.io secure?',
    paragraph: `We wrote Strove.io with security in mind. We store code in state of the art cloud provider - Google Cloud and all the connections to the it are encrypted using SSL to prevent third parties from hijacking any kind of information.
      Projects in Strove.io are run within Docker containers and because of that files used within a project are not accessible to unauthorized users.
      Many tech-forward companies are trying to store as much code in the cloud as possible as it\x27s easier to steal it from physical devices. Security advantage over using traditional way of coding is one of the reasons we started working on Strove.io.`,
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
    header: 'How to manage env variables?',
    paragraph: `To add environment variables create a file that will store them such as .env.development.
      Environment variables will be stored inside your project alone and they will not be shared, as long as files they live in are ignored by git.
      This prevents users from accidentally sharing them even if you share your project using a link such as https://strove.io/#https://github.com/stroveio/2048-clone.`,
  },
  {
    header: 'Is Strove free?',
    paragraph:
      'Yes, each user gets at least 5 GB of RAM and 4 public projects in the free plan.',
  },
  {
    header:
      'I am not able to preview my application from within the IDE even though server is running! What should I do?',
    paragraph:
      'This is most likely due to your app not running on host 0.0.0.0. Some frameworks and servers choose a different port and you can almost always specify that you want host 0.0.0.0 instead.',
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
      'Strove.io is built with Docker and we value this technology greatly. Supporting it requires some additional work on our side but it\x27s one of the most important features on our roadmap.',
  },
]

const FAQ = () => (
  <Layout>
    <SEO title="FAQ" />
    <TextWell>
      <StyledAccordion
        allowZeroExpanded
        allowMultipleExpanded
        preExpanded={[...Array(topics.length).keys()]}
      >
        {topics.map((topic, index) => (
          <AccordionItem key={topic.header} uuid={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <Header>{`${index + 1}. ${topic.header}`}</Header>
              </AccordionItemButton>
            </AccordionItemHeading>

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
        ))}
      </StyledAccordion>
    </TextWell>
  </Layout>
)

export default memo(FAQ)
