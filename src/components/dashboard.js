import React, { useState, memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import dayjs from 'dayjs'
import { withRouter, Link } from 'react-router-dom'

import { mutation, handleStopProject } from 'utils'
import { DELETE_PROJECT, CONTINUE_PROJECT } from 'queries'
import { actions } from 'state'
import { C } from 'state'
import { selectors } from 'state'
import Modal from './modal'
import GetStarted from './getStarted'
import SEO from './seo'
import StroveButton from 'components/stroveButton.js'
import Header from './header/header'

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
  background-color: ${({ theme }) => theme.colors.c2};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh ${({ theme }) => theme.colors.c1};
  margin: 15px;
  width: 50vw;

  @media (max-width: 1366px) {
    width: 80vw;
    height: auto;
  }
`

const ModalButton = styled(StroveButton)`
  animation: ${FullFadeIn} 0.2s ease-out;
  max-width: 150px;
  padding: 0.5vh;
`

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.c1};
  margin: 0.3vh 0.3vh 0.3vh 0;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.c1};
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
  background: ${({ theme, active }) =>
    active ? theme.colors.c8 : theme.colors.c9};
`

const StyledIcon = styled(Icon)`
  font-size: 1.7vh;
  color: ${({ theme }) => theme.colors.c1};
`

const TrialInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c4};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh ${({ theme }) => theme.colors.c1};
  margin-bottom: 0;
  height: auto;
  width: auto;
  min-width: 50vw;
  max-width: 100vw;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.c11};
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  display: flex;
`

const Dashboard = ({ history }) => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.api.getUserProjects)
  const [isModalVisible, setModalVisible] = useState(false)
  const [stopModal, setStopModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const currentProject = projects.find(item => item.machineId)
  const currentProjectId = currentProject?.id
  const projectsLimit = 20

  const handleStartClick = ({ id, editorPort }) => {
    if (!currentProjectId || currentProjectId === id) {
      if (!editorPort) {
        dispatch(
          mutation({
            name: 'continueProject',
            mutation: CONTINUE_PROJECT,
            variables: { projectId: id },
            onSuccessDispatch: null,
          })
        )
      } else {
        dispatch(
          actions.api.fetchSuccess({
            data: { currentProjectId: id },
            storeKey: 'user',
          })
        )
        history.push('/app/editor/')
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
    handleStopProject({ id, dispatch })
  }

  const closeModal = () => {
    setProjectToDelete(null)
    setModalVisible(false)
  }

  return (
    <>
      <SEO title="Dashboard" />
      <Header />
      <PageWrapper>
        <TrialInfoWrapper>Your workspace is currently on the free version of Strove. <StyledLink to="/enterprise">See upgrade options</StyledLink></TrialInfoWrapper>
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
                  <StroveButton
                    to="/app/editor/"
                    isDisabled={isDeleting || isContinuing || isStopping}
                    isPrimary
                    padding="0.5vh"
                    onClick={() => handleStartClick(project)}
                    text={
                      currentProjectId && project.id === currentProjectId
                        ? 'Continue'
                        : 'Start'
                    }
                  />
                  {currentProjectId && currentProjectId === project.id ? (
                    <StroveButton
                      isDisabled={isDeleting || isContinuing || isStopping}
                      padding="0.5vh"
                      onClick={() => {
                        handleStopClick(project.id)
                      }}
                      text="Stop"
                    />
                  ) : null}
                  <StroveButton
                    isDisabled={isDeleting || isContinuing || isStopping}
                    padding="0.5vh"
                    onClick={() => {
                      setModalVisible(true)
                      setProjectToDelete(project)
                    }}
                    text="Delete"
                  />
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
          isDelete={true}
          onClick={() => {
            handleDeleteClick(projectToDelete.id)
            setModalVisible(false)
          }}
          padding="0.5vh"
          text="Confirm"
          maxWidth="150px"
        />
        <ModalButton
          onClick={closeModal}
          text="Close"
          padding="0.5vh"
          maxWidth="150px"
        />
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
          isPrimary
          onClick={() => {
            handleStopClick(currentProjectId)
            setStopModal(false)
          }}
          text="Confirm"
          padding="0.5vh"
          maxWidth="150px"
        />
        <ModalButton
          onClick={() => setStopModal(false)}
          text="Close"
          padding="0.5vh"
          maxWidth="150px"
        />
      </Modal>
    </>
  )
}

export default memo(withRouter(Dashboard))
