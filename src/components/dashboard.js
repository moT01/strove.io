import React, { useState, memo } from 'react'
import { navigate } from 'gatsby'
import styled, { keyframes, css } from 'styled-components'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import dayjs from 'dayjs'

import { query, mutation } from 'utils'
import {
  DELETE_PROJECT,
  CONTINUE_PROJECT,
  STOP_PROJECT,
  MY_PROJECTS,
} from 'queries'
import { actions } from 'state'
import { C } from 'state'
import { selectors } from 'state'
import Modal from './modal'
import GetStarted from './getStarted'
import Layout from './layout'
import SEO from './seo'
import Loader from './fullScreenLoader'

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
  border-radius: 5px;
  border-color: ${({ theme }) => theme.c1};
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin: 15px;
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
  background-color: ${props =>
    (props.primary && '#0072ce') || (props.delete && 'red') || '#fff'};
  border-width: 1px;
  border-style: solid;
  color: ${props =>
    (props.primary && '#fff') || (props.delete && '#fff') || '#0072ce'};
  border-radius: 5px;
  border-color: ${props => (!props.delete ? '#0072ce' : '#000')};
  box-shadow: 0 1vh 1vh -1.5vh ${props => (!props.delete ? '#0072ce' : '#000')};
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
        box-shadow: 0 1.2vh 1.2vh -1.3vh ${({ theme }) => theme.c1};
        transform: translateY(-1px);
      }
    `}
`

const ModalButton = styled(Button)`
  animation: ${FullFadeIn} 0.2s ease-out;
`

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.c1};
  margin: 0.3vh 0.3vh 0.3vh 0;
`

const Text = styled.p`
  color: ${({ theme }) => theme.c1};
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

const CircleIcon = styled.div`
  height: 1.5vh;
  width: 1.5vh;
  border-radius: 50%;
  background: ${props => (props.active ? '#009900' : '#990000')};
`

const StyledIcon = styled(Icon)`
  font-size: 1.7vh;
  color: #0072ce;
`

const Dashboard = () => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.api.getUserProjects)
  const [isModalVisible, setModalVisible] = useState(false)
  const [stopModal, setStopModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const currentProject = projects.find(item => item.machineId)
  const currentProjectId = currentProject && currentProject.id
  const subscription = useSelector(selectors.api.getApiData('subscription'))

  const projectsLimit =
    (subscription.status === 'active' && subscription.projects_limit) || 4

  const handleStartClick = ({ id, editorPort }) => {
    if (!currentProjectId || currentProjectId === id) {
      if (!editorPort) {
        dispatch(
          mutation({
            name: 'continueProject',
            mutation: CONTINUE_PROJECT,
            variables: { projectId: id },
            onSuccess: () => navigate('/app/editor/'),
            onSuccessDispatch: [
              ({ id, editorPort, machineId }) => ({
                type: C.api.UPDATE_ITEM,
                payload: {
                  storeKey: 'myProjects',
                  id,
                  data: { editorPort, machineId },
                },
              }),
              ({ id }) =>
                actions.api.fetchSuccess({
                  data: { currentProjectId: id },
                  storeKey: 'user',
                }),
              () => actions.api.fetchSuccess({ storeKey: 'continueProject' }),
            ],
          })
        )
      } else {
        dispatch(
          actions.api.fetchSuccess({
            data: { currentProjectId: id },
            storeKey: 'user',
          })
        )
        navigate('/app/editor/')
      }
    } else {
      setStopModal(true)
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
            type: C.api.REMOVE_ITEM,
            payload: { storeKey: 'myProjects', id },
          }),
          () => actions.api.fetchSuccess({ storeKey: 'deleteProject' }),
        ],
      })
    )
  }

  const handleStopClick = id => {
    dispatch(
      mutation({
        name: 'stopProject',
        mutation: STOP_PROJECT,
        dataSelector: data => data,
        variables: { projectId: id },
        onSuccessDispatch: [
          () =>
            actions.api.fetchSuccess({
              data: { currentProjectId: null },
              storeKey: 'user',
            }),
          () => actions.api.fetchSuccess({ storeKey: 'stopProject' }),
        ],
      })
    )
    dispatch(
      query({
        name: 'myProjects',
        dataSelector: data => data.myProjects.edges,
        query: MY_PROJECTS,
      })
    )
  }

  const closeModal = () => {
    setProjectToDelete(null)
    setModalVisible(false)
  }

  return (
    <Layout>
      <SEO title="Dashboard" />
      <PageWrapper>
        <GetStarted />
        <TilesWrapper>
          <ProjectTitle>
            Projects count: {projects.length}/{projectsLimit}
          </ProjectTitle>
          {projects.map(project => (
            <Tile key={project.id}>
              <VerticalDivider>
                <InfoWrapper>
                  <ProjectTitle>{project.name}</ProjectTitle>

                  {currentProjectId && project.id === currentProjectId ? (
                    <TextWrapper>
                      <CircleIcon active />
                      <Text>Active</Text>
                    </TextWrapper>
                  ) : (
                    <TextWrapper>
                      <CircleIcon />
                      <Text>Inactive</Text>
                    </TextWrapper>
                  )}
                  <TextWrapper>
                    <StyledIcon type="calendar" />
                    <Text>
                      {dayjs(+project.createdAt).format('DD/MM/YYYY')}
                    </Text>
                  </TextWrapper>
                  {project.description && (
                    <TextWrapper>
                      <StyledIcon type="edit" />
                      <Text>
                        {project.description
                          ? project.description
                          : 'This is the project description.. Tribute'}
                      </Text>
                    </TextWrapper>
                  )}
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
                  {isDeleting || isContinuing || isStopping ? (
                    <Button
                      primary
                      disabled={isDeleting || isContinuing || isStopping}
                    >
                      <Loader
                        isFullScreen={false}
                        color={'#ffffff'}
                        height={'1.2rem'}
                      />
                    </Button>
                  ) : (
                    <Button
                      to="/app/editor/"
                      primary
                      onClick={() => handleStartClick(project)}
                    >
                      {currentProjectId && project.id === currentProjectId
                        ? 'Continue'
                        : 'Start'}
                    </Button>
                  )}
                  {currentProjectId && currentProjectId === project.id ? (
                    isDeleting || isContinuing || isStopping ? (
                      <Button
                        disabled={isDeleting || isContinuing || isStopping}
                      >
                        <Loader
                          isFullScreen={false}
                          color={'#0072ce'}
                          height={'1.2rem'}
                        />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleStopClick(project.id)
                        }}
                      >
                        Stop
                      </Button>
                    )
                  ) : null}
                  {isDeleting || isContinuing || isStopping ? (
                    <Button disabled={isDeleting || isContinuing || isStopping}>
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
        width={isMobileOnly ? '80vw' : '40vw'}
        height={isMobileOnly ? '30vh' : '20vh'}
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
          delete
          onClick={() => {
            handleDeleteClick(projectToDelete.id)
            setModalVisible(false)
          }}
        >
          Confirm
        </ModalButton>
        <ModalButton onClick={closeModal}>Close</ModalButton>
      </Modal>
      <Modal
        width={isMobileOnly ? '80vw' : '40vw'}
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={stopModal}
        onRequestClose={() => setStopModal(false)}
        contentLabel="Stop project?"
        ariaHideApp={false}
      >
        <ModalText>
          Before starting new project you have to stop your currently running
          project. That means you may lose all unsaved progress. Are you sure
          you want to stop your active project?
        </ModalText>
        <ModalButton
          primary
          onClick={() => {
            handleStopClick(currentProjectId)
            setStopModal(false)
          }}
        >
          Confirm
        </ModalButton>
        <ModalButton onClick={() => setStopModal(false)}>Close</ModalButton>
      </Modal>
    </Layout>
  )
}

export default memo(Dashboard)
