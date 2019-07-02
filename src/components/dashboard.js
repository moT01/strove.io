import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from './layout'
import SEO from './seo'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { query, mutation } from 'utils'
import { GET_PROJECTS, DELETE_PROJECT } from 'queries'
import * as C from 'state/currentProject/constants'
import * as ApiC from 'state/api/constants'
import Loader from 'components/fullScreenLoader.js'

import { selectors } from 'state'

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
  padding: 2vh;
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
const Button = styled(Link)`
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
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const DeleteButton = styled.button`
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
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  cursor: pointer;

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

const StyledIcon = styled(Icon)`
  font-size: 1.7vh;
  color: #0072ce;
`

const Dashboard = props => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.getUserProjects)
  const isLoading = useSelector(selectors.getLoading('myProjects'))

  const handleStartClick = ({ editorPort, previewPort, machineId }) => {
    dispatch({
      type: C.SELECT_CURRENT_PROJECT,
      payload: { editorPort, previewPort, machineId },
    })
  }

  const handleDeleteClick = ({ id, machineId }) => {
    dispatch(
      mutation({
        name: 'deleteProject',
        mutation: DELETE_PROJECT,
        variables: { projectId: id, machineId },
        dataSelector: data => data,
        onSuccessAction: () => ({
          type: ApiC.REMOVE_ITEM,
          payload: { storeKey: 'myProjects', id },
        }),
      })
    )
  }

  useEffect(() => {
    dispatch(
      query({
        name: 'myProjects',
        dataSelector: data => data.myProjects.edges,
        query: GET_PROJECTS,
      })
    )
  }, [])

  if (isLoading) return <Loader isFullScreen={true} color={'#0072ce'} />

  return (
    <Layout>
      <SEO title="Dashboard" />
      <TilesWrapper>
        {projects.map(project => (
          <Tile key={project.id}>
            <VerticalDivider>
              <InfoWrapper>
                <ProjectTitle>{project.name}</ProjectTitle>
                <TextWrapper>
                  <StyledIcon type="calendar" />
                  <Text>{project.createdAt}</Text>
                </TextWrapper>
                <TextWrapper>
                  <StyledIcon type="edit" />
                  <Text>
                    {project.description
                      ? project.description
                      : 'This is the project description.. Tribute'}
                  </Text>
                </TextWrapper>
                {/* <TextWrapper>
                  <StyledIcon
                    type="branches"
                  />
                  <Text> {project.branch}</Text>
                </TextWrapper>
                <TextWrapper>
                  <StyledIcon
                    type="code"
                  />
                  <Text>{project.language}</Text>
                </TextWrapper> */}
                <TextWrapper>
                  <StyledIcon type={project.isPrivate ? 'lock' : 'unlock'} />
                  <Text>{project.isPrivate ? 'Private' : 'Public'}</Text>
                </TextWrapper>
              </InfoWrapper>
              <RightSection>
                <Button
                  to="/app/editor/"
                  state={{
                    machineId: project.machineId,
                    editorPort: project.editorPort,
                  }}
                  primary
                  onClick={() =>
                    handleStartClick({
                      editorPort: project.editorPort,
                      previewPort: project.previewPort,
                      machineId: project.machineId,
                    })
                  }
                >
                  Start
                </Button>
                <DeleteButton
                  onClick={() =>
                    handleDeleteClick({
                      id: project.id,
                      machineId: project.machineId,
                    })
                  }
                >
                  Delete
                </DeleteButton>
              </RightSection>
            </VerticalDivider>
          </Tile>
        ))}
      </TilesWrapper>
    </Layout>
  )
}

export default Dashboard
