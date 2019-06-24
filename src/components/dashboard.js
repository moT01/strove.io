import React, { useEffect } from 'react'

import Layout from './layout'
import SEO from './seo'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'antd'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { query } from 'utils'
import { GET_PROJECTS } from 'queries'

import { selectors } from 'state'

const workspaces = [
  {
    name: 'Paweł',
    createdAt: '2019-08-05',
    updatedAt: '2019-10-23',
    description: 'I am a descritpion',
    language: 'javascript',
    branch: 'master',
    isPrivate: true,
  },
  {
    name: 'Best app ever',
    createdAt: '2019-08-05',
    updatedAt: '2019-10-23',
    description: 'I am a descritpion',
    language: 'ruby',
    branch: 'master',
    isPrivate: true,
  },
  {
    name: 'My first react/redux project',
    createdAt: '2019-08-05',
    updatedAt: '2019-10-23',
    description:
      'A very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very long description',
    language: 'html',
    branch: 'master',
    isPrivate: false,
  },
  {
    name: 'Król Świata Mateusz',
    createdAt: '2019-08-05',
    updatedAt: '2019-10-23',
    description: 'I am a descritpion',
    language: 'html',
    branch: 'master',
    isPrivate: true,
  },
  {
    name: 'Paweł',
    createdAt: '2019-08-05',
    updatedAt: '2019-10-23',
    description: 'I am a descritpion',
    language: 'communist',
    branch: 'master',
    isPrivate: true,
  },
  {
    name: 'Adam',
    createdAt: '2019-08-05',
    updatedAt: '2019-10-23',
    description: 'I am a descritpion',
    language: 'german',
    branch: 'master',
    isPrivate: false,
  },
  {
    name: 'Piotrek',
    createdAt: '2019-08-05',
    updatedAt: '2019-10-23',
    description: 'I am a descritpion',
    language: 'javacript',
    branch: 'master',
    isPrivate: true,
  },
  {
    name: 'How to hack Nasa using only html',
    createdAt: '2019-08-05',
    updatedAt: '2019-10-23',
    description: 'I am a descritpion',
    language: 'html',
    branch: 'master',
    isPrivate: false,
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
const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
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
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;

  &:hover {
    transform: scale(1.1);
  }
`
const ProjectTitle = styled.h1`
  font-size: 3vh;
  color: #0072ce;
  margin: 0.3vh 0.3vh 0.3vh 0;
`
const Text = styled.p`
  color: #0072ce;
  font-size: 1.7vh;
  margin-left: 2%;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const ButtonText = styled(Text)`
  color: #ffffff;
  font-size: 2.2vh;
  margin: 0;
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
const RightSection = styled(FlexWrapper)`
  width: 20%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5%;
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

const getUserProjects = selectors.getData('projects', [])

const getProjects = createSelector(
  [getUserProjects],
  projects => projects
)

const getUserToken = selectors.getData('user', {}, 'siliskyToken')

const getProjectPort = () => '23648'

const getMachineId = () => '5d0e233ef9265ebc230bae22'

const getToken = createSelector(
  [getUserToken],
  token => token
)

const getId = createSelector(
  [getMachineId],
  machineId => machineId
)

const getPort = createSelector(
  [getProjectPort],
  port => port
)

const getUserData = createSelector(
  [selectors.getUser],
  user => user
)

const Dashboard = props => {
  const token = useSelector(getToken)
  const id = useSelector(getId)
  const port = useSelector(getPort)
  const user = useSelector(getUserData)

  const projects = useSelector(getProjects)
  console.log(projects)

  useEffect(() => {
    query({
      name: 'projects',
      query: GET_PROJECTS,
      context: {
        headers: {
          Authorization: `Bearer ${user.siliskyToken}`,
          'User-Agent': 'node',
        },
      },
    })
  }, [])

  return (
    <Layout>
      <SEO title="Dashboard" />
      <TilesWrapper>
        {workspaces.map(workspace => (
          <Tile key={workspace.name}>
            <VerticalDivider>
              <InfoWrapper>
                <ProjectTitle>{workspace.name}</ProjectTitle>
                <TextWrapper>
                  <Icon
                    type="calendar"
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text>{workspace.createdAt}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Icon
                    type="edit"
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text>{workspace.description}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Icon
                    type="branches"
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text> {workspace.branch}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Icon
                    type="code"
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text>{workspace.language}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Icon
                    type={workspace.isPrivate ? 'lock' : 'unlock'}
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text>{workspace.isPrivate ? 'Private' : 'Public'}</Text>
                </TextWrapper>
              </InfoWrapper>
              <RightSection>
                <Button primary>
                  <ButtonText>Start</ButtonText>
                </Button>
              </RightSection>
            </VerticalDivider>
          </Tile>
        ))}
      </TilesWrapper>
    </Layout>
  )
}

export default Dashboard
