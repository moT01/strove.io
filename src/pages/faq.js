import React, { memo } from 'react'
import styled from 'styled-components/macro'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'

import { SEO, Header } from 'components'

const StyledAccordion = styled(Accordion)`
  .accordion__item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
    background-color: ${({ theme }) => theme.colors.c4};
  }

  .accordion__panel {
    padding: 0 0px 30px;
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
  color: ${({ theme }) => theme.colors.c3};
  height: auto;
  width: ${isMobile ? '100vw' : '60vw'};
  margin: 0vw 7.5vw 0 7.5vw;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: left;
  text-justify: inter-word;
  background-color: ${({ theme }) => theme.colors.c2};
`
const Paragraph = styled.div`
  text-indent: 30px;
  font-size: 20px;
  display: inline-block;
  padding-top: 0;
  margin: 0;
`

const QuestionHeader = styled.div`
  font-size: 25px;
  font-weight: 500;
  display: inline-block;
`

const StyledAccordionItemPanel = styled(AccordionItemPanel)`
  padding: 10px 0;
`

const topics = [
  {
    header: 'What is Strove.io?',
    paragraph: `Strove exposes cloud servers to allow developers to write, run, build, share and secure software remotely.
    It can provide a local-quality development experience — including full IntelliSense (completions), debugging, and more thanks to support of the most popular code editor VSCode.
    Teams using Strove gain access to consistent environment, allowing programmers to use any device without worrying about 'it works on my machine' issue.`,
  },
  {
    header:
      'How is Strove.io any better than running code on the personal computer?',
    paragraph: `There are several problems programmers face that can be solved by using a remote approach:
      1. Companies need to buy and manage expensive equipment for each developer. Strove allows developers to work on their own computers while still allowing companies to secure code or even, recover it.
      2. Programmers often waste a lot of time on setting up an environment. Strove.io removes this need for each and every developer.
      3. 'It works on my machine'. All team members access instances of the same programming environment. The code works the same way no matter the computer used.
      4. It's hard to secure the code.
      Many tech-forward companies are trying to store as much code in the cloud as possible as it\x27s easier to steal it from physical devices and code stored remotely can be easily recovered.
      Team plan also provides additional features for protecting intellectual property:
      Team admins are able to restrict access to projects or them to be visible for all team members.
      Team admins can recover code from any project made within the organization.`,
  },
  {
    header: 'How does Strove.io handle secure security?',
    paragraph: `Strove stores code in state of the art cloud provider - Google Cloud. Strove uses existing, well known transports like SSH and SSL and to authenticate and secure traffic and encrypt all the connections to prevent third parties from hijacking any kind of information.
      Projects in Strove.io are run within Docker containers and because of that files used within a project are not accessible to unauthorized users.`,
  },
  {
    header: 'Why do I need to log in with Github/Gitlab?',
    paragraph:
      'Aforementioned providers only allow apps to clone if the user is logged in.',
  },
  {
    header: 'How to manage env variables?',
    paragraph: `To add environment variables create a file that will store them such as .env.development.
      Environment variables will be stored inside your project alone and they will not be shared, as long as files they live in are ignored by git.
      This prevents users from accidentally sharing them even if you share your project using a link such as https://strove.io/#https://github.com/stroveio/2048-clone.`,
  },
  {
    header:
      'I am not able to preview my application from within the IDE even though server is running! What should I do?',
    paragraph:
      'This is most likely due to your app not running on host 0.0.0.0. Some frameworks and servers choose a different port and you can almost always specify that you want host 0.0.0.0 instead.',
  },
  {
    header: 'Can I work on mobile apps or Windows/MacOS apps?',
    paragraph: `Yes and no. Here is an overview:
Strove runs code on Linux-based virtual machines and nearly anything that works on Linux Ubuntu works on Strove as well.
Mobile development using solutions such as React Native and Expo or native desktop development using likes of Electron framework is possible.
You won't be able to use Strove if you rely on Windows or MacOS environments. This includes working on iPhone apps using XCode.`,
  },
  {
    header:
      'I want a particular language version that\x27s not yet supported. What should I do to make it work?',
    paragraph:
      'Right now the only way is to contact us on contact@strove.io. We plan to add servers tailored for company needs with predefined language versions in the future.',
  },
  {
    header: 'I want faster projects/more CPU/HDD/RAM etc',
    paragraph: (
      <div>
        We have enterprise plan form companies with specific requirements such
        as these. Visit <Link to="/pricing">Pricing</Link> for more details
        regarding our enterprise plan
      </div>
    ),
  },
  {
    header: 'Where should I report a bug or request a feature?',
    paragraph: (
      <span>
        The best place is our github repository -{' '}
        <a
          href="https://github.com/stroveio/strove.io-client/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          link here
        </a>
      </span>
    ),
  },
  {
    header: 'I didn\x27t find an answer I was looking for.',
    paragraph: (
      <span>
        No worries, contact us at{' '}
        <a href="mailto:contact@strove.io">contact@strove.io</a>.
      </span>
    ),
  },
]

const FAQ = () => (
  <>
    <SEO title="FAQ" />
    <Header />
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
                <QuestionHeader>{`${index + 1}. ${
                  topic.header
                }`}</QuestionHeader>
              </AccordionItemButton>
            </AccordionItemHeading>

            {typeof topic.paragraph === 'string' ? (
              topic.paragraph.split('\n').map((item, i) => (
                <StyledAccordionItemPanel>
                  <Paragraph key={i}>{item}</Paragraph>
                </StyledAccordionItemPanel>
              ))
            ) : (
              <StyledAccordionItemPanel>
                <Paragraph>{topic.paragraph}</Paragraph>
              </StyledAccordionItemPanel>
            )}
          </AccordionItem>
        ))}
      </StyledAccordion>
    </TextWell>
  </>
)

export default memo(FAQ)
