import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import styled, { keyframes, css } from 'styled-components'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { query, mutation } from 'utils'
import { MY_PROJECTS, DELETE_PROJECT, CONTINUE_PROJECT } from 'queries'
import * as C from 'state/currentProject/constants'
import { selectCurrentProject } from 'state/currentProject/actions'
import * as ApiC from 'state/api/constants'
import { selectors } from 'state'
import GetStarted from '../components/getStarted'
import Layout from './layout'
import SEO from './seo'
import Loader from './fullScreenLoader'
import Modal from 'components/modal'

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
  padding-top: 5vh;
`

const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vh;
  margin: 2vh;
  animation: ${FullFadeIn} 0.5s ease-out;
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

const ModalButton = styled(Button)`
  animation: ${FullFadeIn} 0.2s ease-out;
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

const ModalText = styled(Text)`
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
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

const Dashboard = () => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.getUserProjects)
  const [isModalVisible, setModalVisible] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const isDeleting = useSelector(selectors.getLoading('deleteProject'))

  const handleStartClick = ({ id, editorPort, previewPort, machineId }) => {
    if (!editorPort) {
      dispatch(
        mutation({
          name: 'continueProject',
          mutation: CONTINUE_PROJECT,
          variables: { projectId: id },
          onSuccess: () => navigate('/app/editor/'),
          onSuccessDispatch: [
            ({ id, editorPort, previewPort, machineId }) =>
              selectCurrentProject({ id, editorPort, previewPort, machineId }),
          ],
        })
      )
    } else {
      dispatch(selectCurrentProject({ id, editorPort, previewPort, machineId }))
      navigate('/app/editor/')
    }
  }

  const handleDeleteClick = id => {
    dispatch(
      mutation({
        name: 'deleteProject',
        mutation: DELETE_PROJECT,
        variables: { projectId: id },
        dataSelector: data => data,
        onSuccess: () => setProjectToDelete(null),
        onSuccessDispatch: [
          () => ({
            type: ApiC.REMOVE_ITEM,
            payload: { storeKey: 'myProjects', id },
          }),
          () => ({
            type: ApiC.FETCH_SUCCESS,
            payload: { storeKey: 'deleteProject', data: true },
          }),
        ],
      })
    )
  }

  const closeModal = () => {
    setProjectToDelete(null)
    setModalVisible(false)
  }

  useEffect(() => {
    dispatch(
      query({
        name: 'myProjects',
        dataSelector: data => data.myProjects.edges,
        query: MY_PROJECTS,
      })
    )
  }, [])

  return (
    <Layout>
      <SEO title="Dashboard" />
      <PageWrapper>
        <GetStarted />
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
                    primary
                    onClick={() => handleStartClick(project)}
                  >
                    Start
                  </Button>
                  {isDeleting ? (
                    <Button disabled={isDeleting}>
                      <Loader
                        isFullScreen={false}
                        color={'#0072ce'}
                        height={'1.2rem'}
                      />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setModalVisible(true)
                        setProjectToDelete(project)
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </RightSection>
              </VerticalDivider>
            </Tile>
          ))}
        </TilesWrapper>
      </PageWrapper>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        contentLabel="Delete project?"
        ariaHideApp={false}
      >
        <ModalText>
          Are you sure you want to delete this project? This operation cannot be
          undone.
        </ModalText>
        <ModalButton
          primary
          onClick={() => {
            handleDeleteClick(projectToDelete.id)
            setModalVisible(false)
          }}
        >
          Confirm
        </ModalButton>
        <ModalButton onClick={closeModal}>Close</ModalButton>
      </Modal>
    </Layout>
  )
}

export default Dashboard
