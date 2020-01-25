import React, { useState, memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import dayjs from 'dayjs'

import { mutation, handleStopProject } from 'utils'
import { DELETE_PROJECT, CONTINUE_PROJECT, SET_VISIBILITY } from 'queries'
import { selectors, actions, C } from 'state'
import Modal from './modal'
import StroveButton from 'components/stroveButton.js'
import AddProjectProvider from './addProjectProvider'

const FullFadeIn = keyframes`
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
  width: 100%;
  animation: ${FullFadeIn} 0.5s ease-out;
`

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.c1};
  margin: 0.3vh 0.3vh 0.3vh 0;
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-color: ${({ theme }) => theme.colors.c17};
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  padding: 20px;
  width: 100%;
  transition: all 0.2s;

  /* @media (max-width: 1365px) {
      width: 80vw;
      height: auto;
    } */
`

const ModalButton = styled(StroveButton)`
  animation: ${FullFadeIn} 0.2s ease-out;
  max-width: 150px;
  padding: 0.5vh;
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
  align-items: flex-start;
  width: 100%;
  height: 100%;
  flex-direction: ${({ columnOnMobile }) =>
    columnOnMobile && isMobileOnly ? 'column' : 'row'};
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
  align-items: flex-end;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.c1};
`

const Projects = ({ history, projects, addProject, updateTeams }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const [isModalVisible, setModalVisible] = useState(false)
  const [stopModal, setStopModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const currentProject = projects?.find(item => item.machineId)
  const currentProjectId = currentProject?.id
  const myProjects = projects?.filter(project => project.userId === user.id)
  const displayedProjects = projects?.map(project =>
    myProjects.findIndex(x => x.name === project.name) !== -1
      ? project.userId === user.id && project
      : project
  )
  console.log('TCL: Projects -> displayedProjects', displayedProjects)
  console.log('TCL: Projects -> projects', projects)
  console.log('TCL: Projects -> myProjects', myProjects)

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
      <TilesWrapper>
        {/* {projects && (
          <ProjectTitle>
            Projects count: {projects.length}/{projectsLimit}
          </ProjectTitle>
        )} */}
        {displayedProjects?.map((project, index) => {
          const isOwner = project.userId === user.id
          return (
            (project.isVisible || isOwner) && (
              <Tile key={project.id}>
                <VerticalDivider columnOnMobile>
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
                      <StyledIcon
                        type={project.isVisible ? 'eye' : 'eye-invisible'}
                      />
                      <Text>{project.isVisible ? 'Public' : 'Private'}</Text>
                    </TextWrapper>
                  </InfoWrapper>
                  <RightSection>
                    <StroveButton
                      to="/app/editor/"
                      isDisabled={isDeleting || isContinuing || isStopping}
                      isPrimary
                      padding="3px 15px"
                      width="70%"
                      margin="0px 0px 5px 0px"
                      font-size="0.8rem"
                      onClick={() =>
                        isOwner
                          ? handleStartClick(project)
                          : addProject({
                              link: project.repoLink,
                              name: project.name,
                              teamId: project.teamId,
                              forkedFromId: project.id,
                            })
                      }
                      text={
                        isOwner
                          ? currentProjectId && project.id === currentProjectId
                            ? 'Continue'
                            : 'Start'
                          : 'Fork'
                      }
                    />
                    {isOwner &&
                      !project.forkedFromId &&
                      (currentProjectId && currentProjectId === project.id ? (
                        <StroveButton
                          isDisabled={isDeleting || isContinuing || isStopping}
                          padding="3px 15px"
                          width="70%"
                          margin="0px 0px 5px 0px"
                          font-size="0.8rem"
                          onClick={() => {
                            handleStopClick(project.id)
                          }}
                          text="Stop"
                        />
                      ) : (
                        <StroveButton
                          isDisabled={isDeleting || isContinuing || isStopping}
                          padding="3px 15px"
                          width="70%"
                          margin="0px 0px 5px 0px"
                          font-size="0.8rem"
                          onClick={() => {
                            setModalVisible(true)
                            setProjectToDelete(project)
                          }}
                          text="Delete"
                        />
                      ))}
                    {isOwner && !project.forkedFromId && (
                      <StroveButton
                        isDisabled={isDeleting || isContinuing || isStopping}
                        padding="3px 15px"
                        width="70%"
                        margin="0px 0px 5px 0px"
                        font-size="0.8rem"
                        onClick={() => {
                          dispatch(
                            mutation({
                              name: 'setVisibility',
                              mutation: SET_VISIBILITY,
                              variables: {
                                projectId: project.id,
                                isVisible: !project.isVisible,
                              },
                              dataSelector: data => data,
                              onSuccess: () => updateTeams(),
                            })
                          )
                        }}
                        text={project.isVisible ? 'Hide' : 'Show'}
                      />
                    )}
                  </RightSection>
                </VerticalDivider>
              </Tile>
            )
          )
        })}
      </TilesWrapper>

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
    </>
  )
}

export default memo(({ history, projects, updateTeams }) => (
  <AddProjectProvider>
    {({ addProject }) => (
      <Projects
        addProject={addProject}
        history={history}
        projects={projects}
        updateTeams={updateTeams}
      />
    )}
  </AddProjectProvider>
))
