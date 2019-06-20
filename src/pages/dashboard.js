/* eslint-disable */
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled, { keyframes } from "styled-components"
import { Icon } from "antd"

const workspaces = [
  {
    name: "Paweł",
    createdAt: "2019-08-05",
    updatedAt: "2019-10-23",
    description: "I am a descritpion",
    commits: "",
    branch: "master",
  },
  {
    name: "Adam",
    createdAt: "2019-08-05",
    updatedAt: "2019-10-23",
    description: "I am a descritpion",
    commits: "",
    branch: "master",
  },
  {
    name: "Piotrek",
    createdAt: "2019-08-05",
    updatedAt: "2019-10-23",
    description: "I am a descritpion",
    commits: "",
    branch: "master",
  },
  {
    name: "Król Świata Mateusz",
    createdAt: "2019-08-05",
    updatedAt: "2019-10-23",
    description: "I am a descritpion",
    commits: "",
    branch: "master",
  },
  {
    name: "Paweł",
    createdAt: "2019-08-05",
    updatedAt: "2019-10-23",
    description: "I am a descritpion",
    commits: "",
    branch: "master",
  },
  {
    name: "Adam",
    createdAt: "2019-08-05",
    updatedAt: "2019-10-23",
    description: "I am a descritpion",
    commits: "",
    branch: "master",
  },
  {
    name: "Piotrek",
    createdAt: "2019-08-05",
    updatedAt: "2019-10-23",
    description: "I am a descritpion",
    commits: "",
    branch: "master",
  },
  {
    name: "Król Świata Mateusz",
    createdAt: "2019-08-05",
    updatedAt: "2019-10-23",
    description: "I am a descritpion",
    commits: "",
    branch: "master",
  },
]

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3vh;
  margin: 5vh;
  animation: ${FadeIn} 1s ease-out;
`
const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0072ce;
  border-radius: 10px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin: 15px;
  height: 20vh;
  width: 50vw;

  @media (max-width: 1366px) {
    width: 80vw;
    height: auto;
  }
`
const ProjectTitle = styled.h1`
  font-size: 3vh;
  color: #ffffff;
  margin-top: 0.3vh;
`
const Text = styled.p`
  color: #ffffff;
  font-size: 1.7vh;
  margin-top: 0.7vh;
  margin-bottom: 0.7vh;
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
const IconsWrapper = styled(FlexWrapper)`
  flex-grow: 1;
`
const InfoWrapper = styled(FlexWrapper)`
  flex-grow: 8;
  align-items: flex-start;
`

class Dashboard extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Dashboard" />
        <TilesWrapper>
          {workspaces.map(workspace => (
            <Tile>
              <VerticalDivider>
                <IconsWrapper></IconsWrapper>
                <InfoWrapper>
                  <ProjectTitle>{workspace.name}</ProjectTitle>
                  <Text>Created: {workspace.createdAt}</Text>
                  <Text>{workspace.description}</Text>
                  <VerticalDivider>
                    <Icon
                      type="branches"
                      style={{
                        fontSize: "15px",
                        color: `#ffffff`,
                      }}
                    />
                    <Text> {workspace.branch}</Text>
                  </VerticalDivider>
                  <Text>Language</Text>
                </InfoWrapper>
              </VerticalDivider>
            </Tile>
          ))}
        </TilesWrapper>
      </Layout>
    )
  }
}
/* eslint-enable */

export default Dashboard
