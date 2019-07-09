import React from 'react'

import Layout from 'components/layout'
import SEO from 'components/seo'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'antd'
import { Typescript } from '../images/logos'

const FullFadeIn = keyframes`
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
              </VerticalDivider>
            </Tile>
          ))}
        </TilesWrapper>
      </PageWrapper>
    </Layout>
  )
}

export default Dashboard
