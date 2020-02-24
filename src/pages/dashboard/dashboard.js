import React, { useState, memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly, isMobile } from 'react-device-detect'
import isEmail from 'validator/lib/isEmail'
import { Formik, Field } from 'formik'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { mutation, handleStopProject, updateOrganizations } from 'utils'
import { useAnalytics } from 'hooks'
import {
  ADD_MEMBER,
  CREATE_TEAM,
  RENAME_TEAM,
  REMOVE_MEMBER,
  DELETE_TEAM,
  SET_ADMIN,
  LEAVE_TEAM,
  DOWNGRADE_SUBSCRIPTION,
  UPGRADE_SUBSCRIPTION,
  REMOVE_FROM_ORGANIZATION,
} from 'queries'
import { selectors } from 'state'
import {
  GetStarted,
  StroveButton,
  SEO,
  Header,
  Footer,
  Modal,
} from 'components'
import StroveLogo from 'images/strove.png'
import FullScreenLoader from 'components/fullScreenLoader'
import Projects from './projects'
import {
  FormWrapper,
  StyledForm,
  PageWrapper,
  TeamTileWrapper,
  DashboardWrapper,
  Title,
  SectionTitle,
  TeamTile,
  TeamTileSection,
  ModalButton,
  Text,
  ModalText,
  WarningText,
  VerticalDivider,
  Divider,
  RowWrapper,
  InviteStatus,
  IconWrapper,
  ExpandIcon,
  StyledCloseIcon,
  TeamTileHeader,
  TileSectionHeader,
  SettingWrapper,
  DropdownWrapper,
  StyledSelect,
  Setting,
  UserPhoto,
  OrganizationName,
  StyledErrors,
  InviteFormWrapper,
  TilesWrapper,
} from './styled'

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const validateTeamName = values => {
  let errors = {}

  if (values.projectName && !values.projectName.trim()) {
    errors.projectName = 'Add name'
    return errors
  } else if (values.projectName.length > 100) {
    errors.projectName = 'Name too long'
    return errors
  }

  return errors
}

// const TimeBarContainer = styled.div`
//   margin-top: 25px;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   width: 40%;
//   height: 15px;
//   border: 1px solid #0072ce;
//   border-radius: 2px;
//   overflow: hidden;
// `

// const TimeBar = styled.div`
//   height: 100%;
//   width: ${({ time }) => (time / 72000000) * 100}%;
//   background-color: #0072ce;
// `

// const TimeText = styled(Text)`
//   color: ${({ theme }) => theme.colors.c1};
//   font-size: 12px;
// `

const emptyWarningModalContent = {
  visible: false,
  content: null,
  onSubmit: null,
  buttonLabel: '',
}

const Dashboard = ({ history }) => {
  const ref = useAnalytics()
  const dispatch = useDispatch()
  const projects = useSelector(selectors.api.getUserProjects)
  const user = useSelector(selectors.api.getUser)
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const paymentStatus = useSelector(selectors.api.getPaymentStatus)
  const [stopModal, setStopModal] = useState(false)
  // const [time, setTime] = useState({ hours: '0', minutes: '0', seconds: '' })
  const [addMemberEmail, setAddMemberEmail] = useState(false)
  const [addMemberModal, setAddMemberModal] = useState(false)
  const [renameTeamModal, setRenameTeamModal] = useState(false)
  const [addProjectModal, setAddProjectModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [teamLeaderModal, setTeamLeaderModal] = useState(false)
  const [editTeam, setEditTeam] = useState()
  const [editMode, setEditMode] = useState('')
  const [leaderOptions, setLeaderOptions] = useState()
  const [newOwnerSelect, setNewOwnerSelect] = useState('')
  const [warningModal, setWarningModal] = useState(emptyWarningModalContent)
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const currentProjectId = currentProject?.id
  const createTeamError = useSelector(selectors.api.getError('createTeam'))
  const organizationsObj =
    myOrganizations &&
    myOrganizations.reduce((organizations, organization) => {
      return {
        ...organizations,
        [organization.id]: {
          ...organization,
          teams: organization.teams?.reduce((teams, team) => {
            return {
              ...teams,
              [team.id]: team,
            }
          }, {}),
        },
      }
    }, {})
  const [expandedTiles, setExpandedTiles] = useState(() =>
    myOrganizations.reduce((organizations, organization) => {
      return {
        ...organizations,
        [organization.id]: {
          visible: true,
          teams: organization.teams?.reduce((teams, team) => {
            return {
              ...teams,
              [team.id]: {
                visible: true,
                sections: {
                  members: true,
                  projects: true,
                },
              },
            }
          }, {}),
        },
      }
    }, {})
  )

  useEffect(() => {
    dispatch(updateOrganizations())
    // convertToHours()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayHandler = ({ organizationId, teamId, section }) => {
    let newTiles = { ...expandedTiles }
    if (section) {
      const oldValue = newTiles[organizationId].teams[teamId].sections[section]
      newTiles[organizationId].teams[teamId].sections[section] = !oldValue
    } else if (teamId) {
      const oldValue = newTiles[organizationId].teams[teamId].visible
      newTiles[organizationId].teams[teamId].visible = !oldValue
    } else if (organizationId) {
      const oldValue = newTiles[organizationId].visible
      newTiles[organizationId].visible = !oldValue
    }
    setExpandedTiles(newTiles)
  }

  const updateExpandedTiles = newTeam => {
    let newTiles = { ...expandedTiles }
    newTiles[newTeam.organizationId].teams = {
      ...newTiles[newTeam.organizationId].teams,
      [newTeam.id]: {
        visible: true,
        sections: {
          members: true,
          projects: true,
        },
      },
    }
    setExpandedTiles(newTiles)
  }

  const tabs = [
    {
      name: 'Teams',
      content: (
        <DashboardWrapper>
          {expandedTiles &&
            myOrganizations.map(organization => (
              <TilesWrapper key={organization.id}>
                <OrganizationName>{organization.name}</OrganizationName>
                {/* {organization.owner.id === user.id && (
                  <>
                    <TimeBarContainer>
                      <TimeBar time={user.timeSpent} />
                    </TimeBarContainer>
                    <TimeText>
                      Time spent in editor: {time.hours}h {time.minutes}m{' '}
                      {time.seconds}s / 20h
                    </TimeText>
                  </>
                )} */}
                {organization.teams &&
                  Object.values(organizationsObj[organization.id].teams).map(
                    team => {
                      const isExpanded =
                        expandedTiles[organization.id]?.teams[team.id]?.visible
                      const isOwner = team.teamLeader?.id === user.id
                      const isOrganizationOwner =
                        organizationsObj[organization.id].owner.id === user.id
                      return (
                        <TeamTileWrapper key={team.id} expanded={isExpanded}>
                          <TeamTileHeader expanded={isExpanded}>
                            <Divider>
                              <VerticalDivider columnOnMobile>
                                <Title>{team.name}</Title>
                                {isExpanded &&
                                  (isOwner || isOrganizationOwner) && (
                                    <StroveButton
                                      isPrimary
                                      padding="5px"
                                      minWidth="150px"
                                      maxWidth="150px"
                                      margin="10px"
                                      borderRadius="2px"
                                      onClick={() => handleAddMemberClick(team)}
                                      text="Add member"
                                    />
                                  )}
                                {isExpanded &&
                                  (isOwner || isOrganizationOwner ? (
                                    <StroveButton
                                      isDashboard
                                      padding="5px"
                                      minWidth="150px"
                                      maxWidth="150px"
                                      borderRadius="2px"
                                      margin="10px"
                                      text="Settings"
                                      onClick={() => {
                                        handleSettingsClick(team)
                                      }}
                                    />
                                  ) : (
                                    <StroveButton
                                      isPrimary
                                      padding="5px"
                                      minWidth="150px"
                                      maxWidth="150px"
                                      borderRadius="2px"
                                      onClick={() => {
                                        setEditTeam(team)
                                        handleLeaveClick(team)
                                      }}
                                      text="Leave"
                                    />
                                  ))}
                              </VerticalDivider>
                              {myOrganizations?.length > 1 && (
                                <IconWrapper
                                  onClick={() =>
                                    displayHandler({
                                      organizationId: organization.id,
                                      teamId: team.id,
                                    })
                                  }
                                >
                                  <ExpandIcon
                                    type="down"
                                    expanded={isExpanded}
                                  />
                                </IconWrapper>
                              )}
                            </Divider>
                          </TeamTileHeader>
                          {isExpanded && (
                            <TeamTile>
                              {isExpanded &&
                                expandedTiles[organization.id].teams[team.id]
                                  .sections.members && (
                                  <TeamTileSection>
                                    <RowWrapper>
                                      <Divider>
                                        <VerticalDivider>
                                          <UserPhoto
                                            src={
                                              team.teamLeader?.photoUrl
                                                ? team.teamLeader?.photoUrl
                                                : StroveLogo
                                            }
                                          />
                                          <Text>
                                            {team.teamLeader?.name}
                                            <InviteStatus>
                                              Team leader
                                            </InviteStatus>
                                          </Text>
                                        </VerticalDivider>
                                      </Divider>
                                    </RowWrapper>
                                    {team?.users?.map(
                                      member =>
                                        member.name &&
                                        member.id !== team.teamLeader?.id && (
                                          <RowWrapper key={member.name}>
                                            <Divider>
                                              <VerticalDivider>
                                                <UserPhoto
                                                  src={
                                                    member.photoUrl
                                                      ? member.photoUrl
                                                      : StroveLogo
                                                  }
                                                />
                                                <Text>{member.name}</Text>
                                              </VerticalDivider>
                                              {isOwner && (
                                                <StroveButton
                                                  isDelete
                                                  padding="5px"
                                                  margin="0"
                                                  minWidth="150px"
                                                  maxWidth="150px"
                                                  borderRadius="2px"
                                                  text="Remove"
                                                  onClick={() => {
                                                    handleDeleteMemberClick({
                                                      team,
                                                      member,
                                                    })
                                                  }}
                                                />
                                              )}
                                            </Divider>
                                          </RowWrapper>
                                        )
                                    )}
                                    {(isOwner || isOrganizationOwner) &&
                                      team?.invited?.map(member => (
                                        <RowWrapper key={member.name}>
                                          <Divider columnOnMobile>
                                            <VerticalDivider>
                                              <UserPhoto
                                                src={
                                                  member.photoUrl
                                                    ? member.photoUrl
                                                    : StroveLogo
                                                }
                                              />
                                              <Text>
                                                {member.name
                                                  ? member.name
                                                  : member.email}
                                                <InviteStatus>
                                                  Invite pending
                                                </InviteStatus>
                                              </Text>
                                            </VerticalDivider>
                                            <StroveButton
                                              isDelete
                                              padding="5px"
                                              margin="0"
                                              minWidth="150px"
                                              maxWidth="150px"
                                              borderRadius="2px"
                                              text="Cancel"
                                              onClick={() =>
                                                handleDeleteMemberClick({
                                                  team,
                                                  member,
                                                })
                                              }
                                            />
                                          </Divider>
                                        </RowWrapper>
                                      ))}
                                  </TeamTileSection>
                                )}
                              <TileSectionHeader isLast>
                                <Divider>
                                  <SectionTitle>Projects</SectionTitle>
                                  {team.projects?.length > 1 && (
                                    <IconWrapper
                                      onClick={() =>
                                        displayHandler({
                                          organizationId: organization.id,
                                          teamId: team.id,
                                          section: 'projects',
                                        })
                                      }
                                    >
                                      <ExpandIcon
                                        type="down"
                                        expanded={
                                          expandedTiles[organization.id].teams[
                                            team.id
                                          ].sections.projects
                                        }
                                        section
                                      />
                                    </IconWrapper>
                                  )}
                                </Divider>
                              </TileSectionHeader>
                              {expandedTiles[organization.id].teams[team.id]
                                .sections.projects && (
                                <TeamTileSection isLast>
                                  <Projects
                                    projects={team.projects}
                                    organization={organization}
                                    history={history}
                                    setWarningModal={setWarningModal}
                                    organizationsObj={organizationsObj}
                                  />
                                  {isOwner && (
                                    <StroveButton
                                      isPrimary
                                      padding="5px"
                                      minWidth="150px"
                                      maxWidth="150px"
                                      margin="10px"
                                      borderRadius="2px"
                                      text="Add Project"
                                      onClick={() => {
                                        setEditTeam(team)
                                        setAddProjectModal(true)
                                      }}
                                    />
                                  )}
                                </TeamTileSection>
                              )}
                            </TeamTile>
                          )}
                        </TeamTileWrapper>
                      )
                    }
                  )}
                <StroveButton
                  isPrimary
                  padding="5px"
                  margin="10px 0 40px"
                  width="200px"
                  borderRadius="2px"
                  onClick={() =>
                    handleCreateTeamClick({ organizationId: organization.id })
                  }
                  text="Create new team"
                />
              </TilesWrapper>
            ))}
        </DashboardWrapper>
      ),
    },
    {
      name: 'Projects',
      content: <Projects projects={projects} history={history} />,
    },
  ]

  // const convertToHours = () => {
  //   let seconds = Math.floor((user.timeSpent / 1000) % 60)
  //   let minutes = Math.floor((user.timeSpent / (1000 * 60)) % 60)
  //   let hours = Math.floor((user.timeSpent / (1000 * 60 * 60)) % 24)

  //   setTime({ hours, minutes, seconds })
  // }

  const handleCreateTeamClick = ({ organizationId }) => {
    setEditMode('Create team')
    setEditTeam({ organizationId })
    setRenameTeamModal(true)
  }

  const createTeam = ({ name }) => {
    dispatch(
      mutation({
        name: 'createTeam',
        mutation: CREATE_TEAM,
        variables: { name, organizationId: editTeam.organizationId },
        onSuccess: data => {
          setRenameTeamModal(false)
          updateExpandedTiles(data)
        },
        onSuccessDispatch: updateOrganizations,
      })
    )
  }

  const handleDeleteTeamClick = () => {
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Deleting the team will cause deleting all of the team projects. Are
          you sure you want to delete {editTeam.name}?
        </ModalText>
      ),
      buttonLabel: 'Delete',
      onSubmit: () => deleteTeam(),
    })
  }

  const deleteTeam = () => {
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          This operation is irreversible. Are you absolutely sure you want to
          delete {editTeam.name}?
        </ModalText>
      ),
      buttonLabel: 'Delete',
      onSubmit: () => {
        dispatch(
          mutation({
            name: 'deleteTeam',
            mutation: DELETE_TEAM,
            variables: { teamId: editTeam.id },
            onSuccess: () => {
              closeWarningModal()
            },
            onSuccessDispatch: updateOrganizations,
          })
        )
      },
    })
  }

  const handleDeleteMemberClick = ({ member, team }) => {
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Are you sure you want to remove {member.name} from {team.name}?
        </ModalText>
      ),
      onSubmit: () => {
        dispatch(
          mutation({
            name: 'removeMember',
            mutation: REMOVE_MEMBER,
            variables: { teamId: team.id, memberId: member.id },
          })
        )

        dispatch(
          mutation({
            name: 'removeFromOrganization',
            mutation: REMOVE_FROM_ORGANIZATION,
            variables: {
              organizationId: team.organizationId,
              memberId: member.id,
            },
            onSuccess: () => {
              organizationsObj[team.organizationId].status === 'active'
                ? dispatch(
                    mutation({
                      name: 'downgradeSubscription',
                      mutation: DOWNGRADE_SUBSCRIPTION,
                      variables: {
                        organizationId: team.organizationId,
                        quantity:
                          organizationsObj[team.organizationId]
                            ?.subscriptionQuantity - 1,
                      },
                      onSuccessDispatch: updateOrganizations,
                    })
                  )
                : dispatch(updateOrganizations())
            },
          })
        )
        closeWarningModal()
      },
      buttonLabel: 'Remove',
    })
  }

  const handleRenameTeamClick = () => {
    setEditMode('Rename team')
    setRenameTeamModal(true)
  }

  const renameTeam = ({ newName }) =>
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Are you sure you want to rename {editTeam.name} to {newName}?
        </ModalText>
      ),
      buttonLabel: 'Rename',
      onSubmit: () =>
        dispatch(
          mutation({
            name: 'renameTeam',
            mutation: RENAME_TEAM,
            variables: {
              newName,
              teamId: editTeam.id,
            },
            onSuccess: () => {
              setRenameTeamModal(false)
              closeWarningModal()
            },
            onSuccessDispatch: updateOrganizations,
          })
        ),
    })

  useEffect(() => {
    if (paymentStatus?.data?.paymentStatus?.status === 'success' && editTeam) {
      dispatch(
        mutation({
          name: 'addMember',
          mutation: ADD_MEMBER,
          variables: { memberEmail: addMemberEmail, teamId: editTeam.id },
          onSuccess: () => {
            setAddMemberModal(false)
            closeWarningModal()
          },
          onSuccessDispatch: updateOrganizations,
        })
      )
    }

    if (paymentStatus?.data?.paymentStatus?.status === 'fail' && editTeam) {
      setWarningModal({
        visible: true,
        content: (
          <>
            {' '}
            <ModalText>
              Your payment couldn't be processed. Please check your payment
              information and try again
            </ModalText>
            <StroveButton
              isLink
              to="/app/plans"
              text="Plans"
              padding="15px"
              minWidth="250px"
              maxWidth="250px"
              margin="10px"
              fontSize="1.4rem"
              borderRadius="5px"
            />
          </>
        ),
      })
    }

    paymentStatus?.data?.paymentStatus?.status === 'success' &&
      editTeam &&
      dispatch(
        mutation({
          name: 'addMember',
          mutation: ADD_MEMBER,
          variables: { memberEmail: addMemberEmail, teamId: editTeam.id },
          onSuccess: () => {
            setAddMemberModal(false)
            closeWarningModal()
          },
          onSuccessDispatch: updateOrganizations,
        })
      ) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentStatus])

  const handleAddMemberClick = team => {
    setEditTeam(team)
    setAddMemberModal(true)
  }

  const addMember = ({ memberEmail }) => {
    const users = editTeam.users
    const invited = editTeam.users
    const subscriptionStatus =
      organizationsObj[editTeam.organizationId].subscriptionStatus

    if (
      (users && users.findIndex(user => user.email === memberEmail) !== -1) ||
      (invited && invited.findIndex(user => user.email === memberEmail) !== -1)
    ) {
      setWarningModal({
        visible: true,
        content: (
          <ModalText>This user has already been invited to your team</ModalText>
        ),
      })
    } else {
      if (
        organizationsObj[editTeam.organizationId]?.users?.findIndex(
          user => user.email === memberEmail
        ) === -1 ||
        !organizationsObj[editTeam.organizationId].users
      ) {
        if (subscriptionStatus === 'active') {
          setWarningModal({
            visible: true,
            content: (
              <FullScreenLoader
                type="processPayment"
                isFullScreen
                color="#0072ce"
              />
            ),
            noClose: true,
          })
          dispatch(
            mutation({
              name: 'upgradeSubscription',
              mutation: UPGRADE_SUBSCRIPTION,
              variables: {
                organizationId: editTeam.organizationId,
                quantity:
                  organizationsObj[editTeam?.organizationId]
                    ?.subscriptionQuantity + 1,
              },
              onSuccess: () => setAddMemberEmail(memberEmail),
            })
          )
        } else if (subscriptionStatus === 'inactive') {
          dispatch(
            mutation({
              name: 'addMember',
              mutation: ADD_MEMBER,
              variables: { memberEmail, teamId: editTeam.id },
              onSuccess: () => {
                setAddMemberModal(false)
                closeWarningModal()
              },
              onSuccessDispatch: updateOrganizations,
            })
          )
        }
      }
    }
  }

  const handleSetAdminClick = () => {
    setTeamLeaderModal(true)
    setLeaderOptions(() => {
      if (editTeam.users) {
        return editTeam.users.map(user => ({
          values: user.id,
          label: user.name,
        }))
      } else {
        return []
      }
    })
  }

  const setAdmin = ({ newOwner }) => {
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Are you sure you want to set {newOwner.label} to be team leader of{' '}
          {editTeam.name}
        </ModalText>
      ),
      buttonLabel: 'Set team leader',
      onSubmit: () => {
        dispatch(
          mutation({
            name: 'setAdmin',
            mutation: SET_ADMIN,
            variables: {
              teamId: editTeam.id,
              newTeamLeaderId: newOwner.values,
            },
            onSuccess: () => {
              setTeamLeaderModal(false)
            },
            onSuccessDispatch: updateOrganizations,
          })
        )
      },
    })
  }

  const handleNewOwnerSelect = newOwner => setNewOwnerSelect(newOwner)

  const handleSettingsClick = team => {
    setEditTeam(team)
    setSettingsModal(true)
  }

  const handleStopClick = id => {
    handleStopProject({ id, dispatch })
  }

  const handleLeaveClick = team => {
    setEditTeam(team)
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Are you sure you want to leave team{' '}
          {organizationsObj[team.organizationId].teams[team.id].name}?
        </ModalText>
      ),
      onSubmit: () => handleLeaveTeam({ teamId: team.id }),
      buttonLabel: 'Leave',
    })
  }

  const handleLeaveTeam = ({ teamId }) => {
    dispatch(
      mutation({
        name: 'leaveTeam',
        mutation: LEAVE_TEAM,
        variables: { teamId },
        onSuccess: () => {
          closeWarningModal()
        },
        onSuccessDispatch: updateOrganizations,
      })
    )
  }

  const closeWarningModal = () => {
    setWarningModal(emptyWarningModalContent)
  }

  const closeSettingsModal = () => {
    setEditTeam(null)
    setSettingsModal(false)
  }

  const closeAddProjectModal = () => setAddProjectModal(false)

  return (
    <div ref={ref}>
      <SEO title="Dashboard" />
      <Header />
      <PageWrapper>
        {tabs[tabs.findIndex(tab => tab.name === 'Teams')].content}
        <Footer />
      </PageWrapper>
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
          padding="5px"
          maxWidth="150px"
        />
        <ModalButton
          onClick={() => setStopModal(false)}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>
      <Modal
        mindWidth="80vw"
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={addMemberModal}
        onRequestClose={() => setAddMemberModal(false)}
        contentLabel="Add member"
        ariaHideApp={false}
      >
        <Formik
          initialValues={{
            email: '',
          }}
          validate={validate}
          onSubmit={values => addMember({ memberEmail: values.email })}
        >
          {({ errors, values }) => (
            <StyledForm>
              <InviteFormWrapper
                isInvite
                disabled={errors.email || !values.email}
                isMobile={isMobileOnly}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Member email"
                ></Field>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="#9CA2B4"
                    strokeWidth="2"
                  >
                    <path d="M2 4h20v16H2z"></path>
                    <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                  </g>
                </svg>
                <StroveButton
                  isPrimary
                  type="submit"
                  layout="form"
                  text="Invite"
                  disabled={errors.email || !values.email}
                />
              </InviteFormWrapper>
            </StyledForm>
          )}
        </Formik>
        <ModalButton
          onClick={() => setAddMemberModal(false)}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>

      <Modal
        width="300px"
        isOpen={settingsModal}
        onRequestClose={closeSettingsModal}
        contentLabel="Team settings"
        ariaHideApp={false}
      >
        <Title>Team settings</Title>
        <StroveButton
          isPrimary
          borderRadius="2px"
          padding="5px"
          margin="0px 0px 10px 0px"
          onClick={handleRenameTeamClick}
          text="Rename team"
        />
        <StroveButton
          isPrimary
          borderRadius="2px"
          padding="5px"
          margin="0px 0px 10px 0px"
          onClick={handleSetAdminClick}
          text="Set team leader"
        />
        <StroveButton
          isDelete
          borderRadius="2px"
          padding="5px"
          margin="0px 0px 5px 0px"
          onClick={handleDeleteTeamClick}
          text="Delete team"
        />
        <WarningText>Deleting a team can not be undone.</WarningText>

        <ModalButton
          onClick={closeSettingsModal}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>

      <Modal
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={renameTeamModal}
        onRequestClose={() => setRenameTeamModal(false)}
        contentLabel={
          editMode === 'Rename team' ? 'Rename team' : 'Create team'
        }
        ariaHideApp={false}
      >
        <Formik
          initialValues={{
            name: '',
          }}
          validate={validateTeamName}
          onSubmit={values => {
            if (editMode === 'Rename team') {
              renameTeam({ newName: values.name, teamId: editTeam.id })
            } else {
              createTeam({ name: values.name, organizationId: editTeam.id })
            }
          }}
        >
          {({ errors, values }) => (
            <StyledForm>
              <FormWrapper
                disabled={errors.name || !values.name}
                isMobile={isMobileOnly}
              >
                <Field
                  type="name"
                  name="name"
                  placeholder={
                    editMode === 'Rename team' ? 'New team name' : 'Team name'
                  }
                />
                <StroveButton
                  isPrimary
                  type="submit"
                  layout="form"
                  text={editMode === 'Rename team' ? 'Rename' : 'Create'}
                  disabled={errors.name || !values.name}
                />
              </FormWrapper>
            </StyledForm>
          )}
        </Formik>
        <ModalButton
          onClick={() => setRenameTeamModal(false)}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
        {createTeamError && (
          <>
            <Text>Ops! The following error happened during team creation:</Text>
            <StyledErrors>njdnvjd {createTeamError}</StyledErrors>
          </>
        )}
      </Modal>

      <Modal
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={teamLeaderModal}
        onRequestClose={() => setTeamLeaderModal(false)}
        contentLabel="Set team leader"
        ariaHideApp={false}
      >
        <SettingWrapper>
          <Setting>
            <DropdownWrapper>
              <StyledSelect
                value={newOwnerSelect}
                onChange={handleNewOwnerSelect}
                options={leaderOptions}
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary: '#0072ce',
                    neutral5: '#0072ce',
                    neutral10: '#0072ce',
                    neutral20: '#0072ce',
                    neutral30: '#0072ce',
                    neutral40: '#0072ce',
                    neutral50: '#0072ce',
                    neutral60: '#0072ce',
                    neutral70: '#0072ce',
                    neutral80: '#0072ce',
                    neutral90: '#0072ce',
                  },
                })}
              />
            </DropdownWrapper>
          </Setting>
        </SettingWrapper>
        <ModalButton
          onClick={() =>
            setAdmin({
              newOwner: newOwnerSelect,
            })
          }
          text="Set team leader"
          padding="5px"
          maxWidth="150px"
        />
        <ModalButton
          onClick={() => setTeamLeaderModal(false)}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>

      <Modal
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
        height={isMobileOnly ? '30vh' : '20vh'}
        isOpen={warningModal.visible}
        onRequestClose={() => !warningModal.noClose && closeWarningModal()}
        contentLabel="Warning"
        ariaHideApp={false}
      >
        {warningModal.content}
        {warningModal.buttonLabel && (
          <ModalButton
            isPrimary
            onClick={warningModal.onSubmit}
            text={warningModal.buttonLabel}
            padding="5px"
            maxWidth="150px"
          />
        )}
        {!warningModal.noClose && (
          <ModalButton
            onClick={closeWarningModal}
            text="Close"
            padding="5px"
            maxWidth="150px"
          />
        )}
      </Modal>

      <Modal
        isOpen={addProjectModal}
        onRequestClose={closeAddProjectModal}
        ariaHideApp={false}
        isMobile={isMobileOnly}
      >
        {!isMobile && (
          <StyledCloseIcon
            type="close"
            onClick={() => setAddProjectModal(false)}
          />
        )}
        <GetStarted
          closeModal={closeAddProjectModal}
          teamId={editTeam?.id}
          organization={organizationsObj[editTeam?.organizationId]}
        />
      </Modal>
    </div>
  )
}

export default memo(withRouter(Dashboard))
