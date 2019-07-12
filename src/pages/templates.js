import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes, css } from 'styled-components'
import { Icon } from 'antd'

import Layout from 'components/layout'
import SEO from 'components/seo'
import { Typescript } from '../images/logos'
import { createProject } from 'utils'
import { selectors } from 'state'

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
`

const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vh;
  margin: 2vh;
  animation: ${FullFadeIn} 1s ease-out;
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin: 15px;
  height: 25vh;
  width: 50vw;

  @media (max-width: 1366px) {
    width: 80vw;
    height: auto;
  }
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
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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
  border-radius: 1vh;
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
]

const Dashboard = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  const handleClick = item => {
    createProject({
      repoLink: item.link,
      dispatch: dispatch,
      user: user,
    })
  }

  return (
    <Layout>
      <SEO title="Templates" />
      <PageWrapper>
        <TilesWrapper>
          {templates.map(template => (
            <Tile key={template.name}>
              <VerticalDivider>
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

export default Dashboard
