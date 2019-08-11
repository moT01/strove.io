import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Icon } from 'antd'
import { isMobileOnly } from 'react-device-detect'

import Layout from 'components/layout'
import SEO from 'components/seo'
import { Typescript } from 'images/logos'
import AddProjectProvider from 'components/addProjectProvider'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
  }
`

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ButtonFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
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
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  justify-content: center;
  align-items: ${props => (props.mobile ? 'center' : 'flex-start')};
`

const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vh;
  animation: ${FullFadeIn} 1s ease-out;
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin: 15px;
  height: auto;
  width: 45vw;
`

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: #0072ce;
  margin: 0.3vh 0.3vh 0.3vh 0;
`

const Text = styled.p`
  color: #0072ce;
  font-size: 1rem;
  margin-left: 2%;
  margin-bottom: 0;
  text-align: left;
`

const VerticalDivider = styled.div`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InfoWrapper = styled(FlexWrapper)`
  width: 80%;
  align-items: flex-start;
`

const TextWrapper = styled(FlexWrapper)`
  flex-direction: row;
  margin-top: 0.3vh;
  margin-bottom: 0.3vh;
  width: 90%;
  height: auto;
  justify-content: flex-start;
`

const StyledIcon = styled(Icon)`
  font-size: 1.7vh;
  color: #0072ce;
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  min-width: 70px;
  max-width: 150px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;

  :focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
        transform: translateY(-1px);
      }
    `}
`

const templates = [
  {
    name: 'Typescript + Node',
    icon: <Typescript />,
    link: 'https://github.com/microsoft/TypeScript-Node-Starter',
    description:
      'A starter template for TypeScript and Node with a detailed README describing how to use the two together.',
  },
  {
    name: 'Node + React',
    icon: <Typescript />,
    link: 'https://github.com/Rosuav/full-stack-app',
    description: 'Basic full-stack JavaScript app template.',
  },
  {
    name: 'React express template',
    icon: <Typescript />,
    link: 'https://github.com/khaled/react-express-template',
    description:
      'Full stack web app starter template with React 15, React Router, ES6 (via Babel), CoffeeScript, Express/Node.js, Semantic-UI, Gulp and more.',
  },
  {
    name: 'Thinkful Full Stack Template',
    icon: <Typescript />,
    link: 'https://github.com/Thinkful-Ed/full-stack-template.git',
    description:
      'Full stack web app starter template with React 15, React Router, ES6 (via Babel), CoffeeScript, Express/Node.js, Semantic-UI, Gulp and more.',
  },
  {
    name: 'Giter8',
    icon: <Typescript />,
    link: 'https://github.com/tbje/full-stack.g8',
    description:
      'This is a minimal Giter8 template for Full Stack Scala with ScalaJS in the front & Akka HTTP in the back. Binding is done using Autowire and BooPickle.',
  },
  {
    name: 'Elixir-HelloWorld',
    icon: <Typescript />,
    link:
      'https://github.com/codengo-llc/Elixir-HelloWorld#basic-elixir-project-created-with-silisky',
    description: 'A basic Elixir Project Created With Strove.',
  },
  {
    name: 'C-HelloWorld',
    icon: <Typescript />,
    link: 'https://github.com/codengo-llc/C-HelloWorld',
    description: 'A basic C Project Created With Strove.',
  },
  {
    name: 'R-HelloWorld',
    icon: <Typescript />,
    link: 'https://github.com/codengo-llc/R-HelloWorld',
    description: 'A basic R Project Created With Strove.',
  },
  {
    name: 'Scala-HelloWorld',
    icon: <Typescript />,
    link: 'https://github.com/codengo-llc/Scala-HelloWorld',
    description: 'A basic Scala Project Created With Strove.',
  },
  {
    name: 'Haskell-HelloWorld',
    icon: <Typescript />,
    link: 'https://github.com/codengo-llc/Haskell-HelloWorld',
    description: 'A basic Haskell Project Created With Strove.',
  },
  {
    name: 'Php-HelloWorld',
    icon: <Typescript />,
    link: 'https://github.com/codengo-llc/Php-HelloWorld',
    description: 'A basic Php Project Created With Strove.',
  },
  {
    name: 'Rust-HelloWorld',
    icon: <Typescript />,
    link: 'https://github.com/codengo-llc/Rust-HelloWorld',
    description: 'A basic Rust Project Created With Strove.',
  },
]

const Dashboard = ({ addProject }) => {
  const handleClick = item => addProject(item.link)

  const leftColumn = []
  const rightColumn = []

  templates.map((template, index) =>
    index % (isMobileOnly ? 1 : 2) === 0
      ? leftColumn.push(template)
      : rightColumn.push(template)
  )

  return (
    <Layout>
      <SEO title="Templates" />
      <PageWrapper mobile={isMobileOnly}>
        <TilesWrapper>
          {leftColumn.map(template => (
            <Tile key={template.name}>
              <VerticalDivider mobile={isMobileOnly}>
                <InfoWrapper>
                  <ProjectTitle>{template.name}</ProjectTitle>
                  <TextWrapper>
                    <StyledIcon type="edit" />
                    <Text>{template.description}</Text>
                  </TextWrapper>
                </InfoWrapper>
                <Button primary onClick={() => handleClick(template)}>
                  Start
                </Button>
              </VerticalDivider>
            </Tile>
          ))}
        </TilesWrapper>
        <TilesWrapper>
          {rightColumn.map(template => (
            <Tile key={template.name}>
              <VerticalDivider mobile={isMobileOnly}>
                <InfoWrapper>
                  <ProjectTitle>{template.name}</ProjectTitle>
                  <TextWrapper>
                    <StyledIcon type="edit" />
                    <Text>{template.description}</Text>
                  </TextWrapper>
                </InfoWrapper>
                <Button primary onClick={() => handleClick(template)}>
                  Start
                </Button>
              </VerticalDivider>
            </Tile>
          ))}
        </TilesWrapper>
      </PageWrapper>
    </Layout>
  )
}

export default memo(() => (
  <AddProjectProvider>
    {({ addProject }) => <Dashboard addProject={addProject} />}
  </AddProjectProvider>
))
