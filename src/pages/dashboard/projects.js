import React, { useState, memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import dayjs from 'dayjs'

import { mutation, handleStopProject, updateOrganizations } from 'utils'
import {
  DELETE_PROJECT,
  CONTINUE_PROJECT,
  SET_VISIBILITY,
  START_COLLABORATION_PROJECT,
  STOP_COLLABORATION_PROJECT,
} from 'queries'
import { selectors, actions, C } from 'state'
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
  const continueProjectError = useSelector(
    selectors.api.getError('continueProject')
  )
  const isProjectBeingAdded = useSelector(
    selectors.incomingProject.isProjectBeingAdded
  )
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const currentProjectId = currentProject?.id
  // This code filters other users' and already forked projects
  const displayedProjects = sortByActiveProjects(projects)
  // .map(project =>
  //   projects.filter(project => project.userId === user.id).findIndex(x => x.name === project.name) !== -1 ? project.userId === user.id && project : project
  // )

  const isDisabled = isDeleting || isContinuing || isStopping

  useEffect(() => {
    if (continueProjectError === 'USER_SESSION_TIME_DEPLETED') {
      setWarningModal({
        visible: true,
        content: (
          <>
            <ModalText>
              You have exceeded the monthly editor time for free users.
            </ModalText>
            <ModalText>
              If you need more time to work on your amazing projects upgrade
              your subscription plan.
            </ModalText>
            <StroveButton
              isLink
              isPrimary
              to="/app/plans"
              text="Pricing"
              padding="5px"
              minWidth="150px"
              maxWidth="150px"
              margin="10px"
              borderRadius="5px"
            />
          </>
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continueProjectError])

  const usersProjects = projects.filter(project => project.userId !== user.id)

  const handleStartClick = ({ id, teamId }) => {
    const currentEditorPort = currentProject?.editorPort
    if (!currentProjectId || currentProjectId === id) {
      if (!currentEditorPort) {
        dispatch(
          mutation({
            name: 'continueProject',
            mutation: CONTINUE_PROJECT,
            variables: { projectId: id, teamId },
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

  const handleJoinLiveshareClick = ({ id, teamId }) => {
    const editorPort = currentProject?.editorPort
    if (!currentProjectId || currentProjectId === id) {
      if (!editorPort) {
        dispatch(
          mutation({
            name: 'startCollaborationProject',
            mutation: START_COLLABORATION_PROJECT,
            variables: { projectId: id, teamId },
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

  const handleStopLiveshareClick = ({ project }) => {
    dispatch(
      mutation({
        name: 'stopCollaborationProject',
        mutation: STOP_COLLABORATION_PROJECT,
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
        onSuccessDispatch: [
          () => ({
            type: C.api.REMOVE_ITEM,
            payload: { storeKey: 'myProjects', id },
          }),
          () => actions.api.fetchSuccess({ storeKey: 'deleteProject' }),
          updateOrganizations,
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
                            {project.isVisible ? 'Hide' : 'Show'}
                          </IconDescription>
                          <ProjectActionIcon
                            type={project.isVisible ? 'lock' : 'share-alt'}
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
                        <ProjectActionIcon type="video-camera-outlined" />
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
