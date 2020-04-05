import React, { useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import dayjs from 'dayjs'

import { mutation, handleStopProject, updateOrganizations } from 'utils'
import {
  DELETE_PROJECT,
  CONTINUE_PROJECT,
  SET_VISIBILITY,
  START_LIVE_SHARE,
  STOP_LIVE_SHARE,
} from 'queries'
import { selectors, actions } from 'state'
import { Modal, StroveButton, AddProjectProvider } from 'components'
import StroveLogo from 'images/strove.png'

import {
  TilesWrapper,
  ModalButton,
  Text,
  ModalText,
  VerticalDivider,
  UserPhoto,
  ProjectTitle,
  RightSection,
  ProjectsTile,
  InfoWrapper,
  TextWrapper,
  CircleIcon,
  StyledIcon,
  ProjectActionIcon,
  IconDescription,
} from './styled'

const sortByActiveProjects = projects =>
  projects?.reduce((acc, element) => {
    if (element?.machineId) {
      return [element, ...acc]
    }
    return [...acc, element]
  }, []) || []

const Projects = ({
  history,
  projects,
  addProject,
  setWarningModal,
  isOwner,
  isOrganizationOwner,
}) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const [isModalVisible, setModalVisible] = useState(false)
  const [stopModal, setStopModal] = useState(false)
  const [showUsersProjects, setShowUsersProjects] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const isProjectBeingAdded = useSelector(
    selectors.incomingProject.isProjectBeingAdded
  )
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const currentProjectId = currentProject?.id
  // This code filters other users' and already forked projects
  const displayedProjects = sortByActiveProjects(projects)

  const isDisabled = isDeleting || isContinuing || isStopping

  const usersProjects = projects.filter(project => project.userId !== user.id)

  const handleStartClick = ({ id, teamId }) => {
    if (!currentProjectId) {
      dispatch(actions.incomingProject.setProjectIsBeingStarted())
      return dispatch(
        mutation({
          name: 'continueProject',
          mutation: CONTINUE_PROJECT,
          variables: { projectId: id, teamId },
        })
      )
    }

    if (currentProjectId === id) {
      return history.push('/app/editor/')
    }
    return setStopModal(true)
  }

  const handleJoinLiveshareClick = ({ id, teamId }) => {
    const startedCollaborationFromId =
      currentProject?.startedCollaborationFromId

    if (!currentProjectId) {
      dispatch(
        actions.incomingProject.setProjectIsBeingAdded({
          isLiveshare: true,
        })
      )
      return dispatch(
        mutation({
          name: 'startLiveShare',
          mutation: START_LIVE_SHARE,
          variables: { projectId: id, teamId },
        })
      )
    }

    if (currentProjectId === id || startedCollaborationFromId === id) {
      return history.push('/app/editor/')
    }
    return setStopModal(true)
  }

  const handleStopLiveshareClick = ({ project }) => {
    dispatch(
      mutation({
        name: 'stopLiveShare',
        mutation: STOP_LIVE_SHARE,
        variables: { projectId: project.id },
        onSuccessDispatch: updateOrganizations,
      })
    )
  }

  const handleDeleteClick = id => {
    dispatch(
      mutation({
        name: 'deleteProject',
        mutation: DELETE_PROJECT,
        variables: { projectId: id },
        dataSelector: data => data,
        onSuccess: () => {
          setProjectToDelete(null)
        },
        onSuccessDispatch: updateOrganizations,
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
        {displayedProjects?.map(project => {
          const isProjectOwner = project.userId === user.id
          return (
            (project.isVisible || isProjectOwner) && (
              <ProjectsTile key={project.id}>
                <VerticalDivider columnOnMobile>
                  <InfoWrapper>
                    <ProjectTitle>{project.name}</ProjectTitle>
                    <TextWrapper>
                      <UserPhoto src={project?.user?.photoUrl || StroveLogo} />
                      <Text>{project.user.name}</Text>
                    </TextWrapper>

                    {project.machineId ? (
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
                        <Text>{project.description}</Text>
                      </TextWrapper>
                    )}
                    <TextWrapper>
                      <StyledIcon type={project.isVisible ? 'team' : 'user'} />
                      <Text>{project.isVisible ? 'Public' : 'Private'}</Text>
                    </TextWrapper>
                  </InfoWrapper>
                  <RightSection>
                    {/* TODO: Display this section once forks work properly */}
                    {isProjectOwner && (
                      <StroveButton
                        to="/app/editor/"
                        isDisabled={
                          isDeleting ||
                          isContinuing ||
                          isStopping ||
                          isProjectBeingAdded
                        }
                        isPrimary
                        borderRadius="2px"
                        padding="3px 15px"
                        minWidth="150px"
                        maxWidth="150px"
                        margin="0 0 5px"
                        font-size="0.8rem"
                        onClick={() =>
                          isProjectOwner
                            ? handleStartClick(project)
                            : addProject({
                                link: project.repoLink,
                                name: project.name,
                                teamId: project.teamId,
                                forkedFromId: project.id,
                              })
                        }
                      >
                        <IconDescription>
                          {isProjectOwner
                            ? currentProjectId &&
                              project.id === currentProjectId
                              ? 'Continue'
                              : 'Start'
                            : 'Fork'}
                        </IconDescription>
                        <ProjectActionIcon
                          type={
                            isProjectOwner
                              ? currentProjectId &&
                                project.id === currentProjectId
                                ? 'play-circle'
                                : 'play-circle'
                              : 'fork'
                          }
                        />
                      </StroveButton>
                    )}

                    {project.editorPort && !isProjectOwner && (
                      <StroveButton
                        to="/app/editor/"
                        isDisabled={isDisabled}
                        isPrimary
                        borderRadius="2px"
                        padding="3px 15px"
                        minWidth="150px"
                        maxWidth="150px"
                        margin="0 0 5px"
                        font-size="0.8rem"
                        onClick={() => handleJoinLiveshareClick(project)}
                      >
                        <IconDescription>Join liveshare</IconDescription>
                        <ProjectActionIcon type="video-camera-fill" />
                      </StroveButton>
                    )}

                    {isProjectOwner &&
                      !project.forkedFromId &&
                      (currentProjectId && currentProjectId === project.id ? (
                        <StroveButton
                          isDisabled={isDisabled}
                          padding="3px 15px"
                          borderRadius="2px"
                          minWidth="150px"
                          maxWidth="150px"
                          margin="0px 0px 5px 0px"
                          font-size="0.8rem"
                          onClick={() => {
                            project.startedCollaborationFromId
                              ? handleStopLiveshareClick({ project })
                              : handleStopClick(project.id)
                          }}
                        >
                          <IconDescription>Stop</IconDescription>
                          <ProjectActionIcon type="pause-circle" />
                        </StroveButton>
                      ) : (
                        <StroveButton
                          isDisabled={isDisabled}
                          padding="3px 15px"
                          borderRadius="2px"
                          margin="0px 0px 5px 0px"
                          font-size="0.8rem"
                          minWidth="150px"
                          maxWidth="150px"
                          onClick={() => {
                            setModalVisible(true)
                            setProjectToDelete(project)
                          }}
                        >
                          <IconDescription>Delete</IconDescription>
                          <ProjectActionIcon type="delete" />
                        </StroveButton>
                      ))}
                    {!isProjectOwner && (
                      <StroveButton
                        to="/app/editor/"
                        isDisabled={isDisabled}
                        isPrimary
                        borderRadius="2px"
                        padding="3px 15px"
                        minWidth="150px"
                        maxWidth="150px"
                        margin="0 0 5px"
                        font-size="0.8rem"
                        onClick={() =>
                          addProject({
                            link: project.repoLink,
                            name: project.name,
                            teamId: project.teamId,
                            forkedFromId: project.id,
                          })
                        }
                      >
                        <IconDescription>Fork</IconDescription>
                        <ProjectActionIcon type="fork" />
                      </StroveButton>
                    )}
                    {isProjectOwner &&
                      !project.forkedFromId &&
                      !project.startedCollaborationFromId && (
                        <StroveButton
                          isDisabled={isDisabled}
                          padding="3px 15px"
                          borderRadius="2px"
                          margin="0px 0px 5px 0px"
                          font-size="0.8rem"
                          minWidth="150px"
                          maxWidth="150px"
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
                                onSuccessDispatch: updateOrganizations,
                              })
                            )
                          }}
                        >
                          <IconDescription>
                            {project.isVisible ? 'Make private' : 'Make public'}
                          </IconDescription>
                          <ProjectActionIcon
                            type={project.isVisible ? 'user' : 'team'}
                          />
                        </StroveButton>
                      )}
                  </RightSection>
                </VerticalDivider>
              </ProjectsTile>
            )
          )
        })}

        {(isOwner || isOrganizationOwner) && usersProjects.length !== 0 && (
          <>
            <StroveButton
              text="Teams' private projects"
              padding="2px 15px"
              borderRadius="2px"
              margin="5px 0"
              width="300px"
              onClick={() => {
                setShowUsersProjects(!showUsersProjects)
              }}
            />
            {showUsersProjects &&
              usersProjects?.map((project, index) => {
                return (
                  <ProjectsTile key={project.id}>
                    <VerticalDivider columnOnMobile>
                      <InfoWrapper>
                        <ProjectTitle>{project.name}</ProjectTitle>
                        <TextWrapper>
                          <UserPhoto
                            src={project?.user?.photoUrl || StroveLogo}
                          />
                          <Text>{project.user.name}</Text>
                        </TextWrapper>

                        {project.machineId ? (
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
                            <Text>{project.description}</Text>
                          </TextWrapper>
                        )}
                        <TextWrapper>
                          <StyledIcon
                            type={project.isVisible ? 'team' : 'user'}
                          />
                          <Text>
                            {project.isVisible ? 'Public' : 'Private'}
                          </Text>
                        </TextWrapper>
                      </InfoWrapper>
                      <RightSection>
                        {project.editorPort && (
                          <StroveButton
                            to="/app/editor/"
                            isDisabled={isDisabled}
                            isPrimary
                            borderRadius="2px"
                            padding="3px 15px"
                            minWidth="150px"
                            maxWidth="150px"
                            margin="0 0 5px"
                            font-size="0.8rem"
                            onClick={() => handleJoinLiveshareClick(project)}
                          >
                            <IconDescription>Join liveshare</IconDescription>
                            <ProjectActionIcon type="video-camera-outlined" />
                          </StroveButton>
                        )}
                        <StroveButton
                          to="/app/editor/"
                          isDisabled={isDisabled}
                          isPrimary
                          borderRadius="2px"
                          padding="3px 15px"
                          minWidth="150px"
                          maxWidth="150px"
                          margin="0 0 5px"
                          font-size="0.8rem"
                          onClick={() =>
                            addProject({
                              link: project.repoLink,
                              name: project.name,
                              teamId: project.teamId,
                              forkedFromId: project.id,
                            })
                          }
                        >
                          <IconDescription>Fork</IconDescription>
                          <ProjectActionIcon type="fork" />
                        </StroveButton>
                        {(isOwner || isOrganizationOwner) && (
                          <StroveButton
                            isDisabled={isDisabled}
                            padding="3px 15px"
                            borderRadius="2px"
                            margin="0px 0px 5px 0px"
                            font-size="0.8rem"
                            minWidth="150px"
                            maxWidth="150px"
                            onClick={() => {
                              setModalVisible(true)
                              setProjectToDelete(project)
                            }}
                          >
                            <IconDescription>Delete</IconDescription>
                            <ProjectActionIcon type="delete" />
                          </StroveButton>
                        )}
                      </RightSection>
                    </VerticalDivider>
                  </ProjectsTile>
                )
              })}
          </>
        )}
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
          maxWidth="150px"
        />
        <ModalButton
          onClick={() => setStopModal(false)}
          text="Close"
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
          text="Confirm"
          maxWidth="150px"
        />
        <ModalButton onClick={closeModal} text="Close" maxWidth="150px" />
      </Modal>
    </>
  )
}

export default memo(
  ({
    history,
    projects,
    organization,
    setWarningModal,
    organizationsObj,
    isOwner,
    isOrganizationOwner,
  }) => (
    <AddProjectProvider organization={organization}>
      {({ addProject }) => (
        <Projects
          addProject={addProject}
          history={history}
          projects={projects}
          organization={organization}
          setWarningModal={setWarningModal}
          organizationsObj={organizationsObj}
          isOwner={isOwner}
          isOrganizationOwner={isOrganizationOwner}
        />
      )}
    </AddProjectProvider>
  )
)
