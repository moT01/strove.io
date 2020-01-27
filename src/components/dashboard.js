import React, { useState, memo, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components/macro'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly, isMobile } from 'react-device-detect'
import isEmail from 'validator/lib/isEmail'
import { Formik, Form, Field } from 'formik'
import { withRouter } from 'react-router-dom'
import ReactModal from 'react-modal'
import Select from 'react-select'

import { mutation, handleStopProject, query } from 'utils'
import {
  ADD_MEMBER,
  CREATE_TEAM,
  RENAME_TEAM,
  REMOVE_MEMBER,
  MY_TEAMS,
  DELETE_TEAM,
  TRANSFER_OWNERSHIP,
  LEAVE_TEAM,
} from 'queries'
import { selectors } from 'state'
import Modal from './modal'
import { GetStarted, Projects } from 'components'
import SEO from './seo'
import StroveButton from 'components/stroveButton.js'
import Header from './header/header'
import Footer from './footer'
import StroveLogo from 'images/strove.png'

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

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 400px;
  flex-wrap: wrap;
  margin: 20px 0 5px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
  background: ${({ theme }) => theme.colors.c2};
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  opacity: 0.9;
  align-items: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      box-shadow: none;
      min-width: 100px;
      border-radius: 5px;
    `}
  &:hover {
    opacity: 1;
    box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
      0 9px 26px 0 rgba(174, 174, 186, 0.16);
    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: none;
      `}
  }
  input {
    box-shadow: none;
    color: ${({ theme }) => theme.colors.c12};
    outline: 0;
    background: ${({ theme }) => theme.colors.c2};
    width: calc(100% - 156px);
    height: 56px;
    padding: 0;
    padding-left: ${({ isInvite }) => (isInvite ? '64px' : '8px')};
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 36px;
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    border: 0;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    ${({ isMobile }) =>
      isMobile &&
      css`
        flex-direction: column;
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
      `}
  }
  svg {
    position: absolute;
    top: 18px;
    left: 20px;
    height: 24px;
    width: 24px;
    g {
      stroke: ${({ theme }) => theme.colors.c1};
    }
  }
`

const StyledForm = styled(Form)`
  width: 100%;
`

// const StyledInfo = styled.span`
//   margin: 20px;
//   color: ${({ theme }) => theme.colors.c13};
//   font-size: 13px;
// `

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const PageWrapper = styled(Wrapper)`
  min-height: calc(100vh - 64px);
  width: calc(100vw - 20px);
  padding-top: 10px;
  margin: 0 20px;
  justify-content: space-between;
`

const TeamTileWrapper = styled(Wrapper)`
  margin: 20px 0px;
  transition: all 0.2s;
  width: 100%;
  height: ${({ expanded }) => (expanded ? 'auto' : '2.5rem')};
`

const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${() => (isMobileOnly ? '100%' : '80%')};
  animation: ${FullFadeIn} 0.5s ease-out;
`

const Title = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.c3};
  margin: 3px 3px 3px 0;
`

const SectionTitle = styled(Title)`
  font-size: 1.2rem;
  font-weight: 400;
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-radius: 2px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: ${({ expanded, theme }) =>
    expanded ? '0' : ` 0 15px 15px -15px ${theme.colors.c19}`};
  margin: 15px;
  width: 50%;
  transition: all 0.2s;

  /* @media (max-width: 1365px) {
    width: 80vw;
    height: auto;
  } */
`

const TeamTile = styled(Tile)`
  width: 100%;
  padding: 0px;
  margin: 0px;
  border-top: none;
`

const TeamTileSection = styled(Tile)`
  align-items: flex-start;
  margin: 0px;
  padding: 5px;
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  border-width: 1px 0px 0px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  width: 100%;
  box-shadow: none;
`

const ModalButton = styled(StroveButton)`
  animation: ${FullFadeIn} 0.2s ease-out;
  max-width: 150px;
  padding: 5px;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin-left: 10px;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ModalText = styled(Text)`
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
  word-break: break-word;
`

const WarningText = styled(ModalText)`
  color: ${({ theme }) => theme.colors.c5};
  margin-bottom: 5px;
  word-break: break-word;
`

const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Divider = styled(VerticalDivider)`
  justify-content: space-between;
  flex-direction: ${({ columnOnMobile }) =>
    columnOnMobile && isMobileOnly ? 'column' : 'row'};
`

const RowWrapper = styled(VerticalDivider)`
  border-width: 0px 0px 1px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-style: solid;
  padding: 10px 8px;
`

const DeleteButton = styled.button`
  width: ${({ isSettings }) => (isSettings ? '80%' : '15%')};
  min-width: 150px;
	box-shadow: inset 0px 1px 0px 0px #cf866c;
	background: linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
	background-color: #d0451b;
	border-radius: 3px;
	border: 1px solid #942911;
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	font-size: 0.6rem;
  font-weight: 500;
	padding: 3px 12px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #854629;
}
:hover {
	background: linear-gradient(to bottom, #bc3315 5%, #d0451b 100%);
	background-color: #bc3315;
}
`

const InviteStatus = styled.span`
  color: ${({ theme }) => theme.colors.c16};
  margin-left: 24px;
`

const StyledIcon = styled(Icon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.c3};
  cursor: pointer;
  animation: ${FullFadeIn} 0.5s ease-out;
`

const SettingsIcon = styled(StyledIcon)`
  margin-left: 5px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.c2};
`

const IconWrapper = styled(Wrapper)`
  min-width: 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  i {
    line-height: 0;
  }
`

const ExpandIcon = styled(StyledIcon)`
  font-size: 1rem;
  transform: ${({ expanded }) =>
    expanded ? ' rotate(180deg)' : 'rotate(0deg)'};
  color: ${({ theme }) => theme.colors.c3};
  transition: all 0.2s;
  :focus {
    outline: none;
  }
`

const StyledCloseIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.7vh;
  color: ${({ theme }) => theme.colors.c1};
  cursor: pointer;
  :focus {
    outline: none;
  }
`

const StyledReactModal = styled(ReactModal)`
  display: flex;
  height: auto;
  width: auto;
  position: fixed;
  animation: ${FullFadeIn} 0.2s ease-out;
  :focus {
    outline: 0;
  }
`

const TeamTileHeader = styled(Tile)`
  width: 100%;
  height: 2.5rem;
  margin: 0;
  padding: 0px 0px 0px 10px;
  transition: all 0.2s;
  border-bottom-left-radius: ${({ expanded }) => (expanded ? '0px' : '5px')};
  border-bottom-right-radius: ${({ expanded }) => (expanded ? '0px' : '5px')};
  ${({ expanded }) => expanded && 'border-bottom: none;'}

  ${Title} {
    color: ${({ theme }) => theme.colors.c3};
    transition: all 0.2s;
  }

  ${({ shouldTabsBeCollapsable }) =>
    shouldTabsBeCollapsable &&
    `
    :hover {
      background-color: ${({ theme }) => theme.colors.c19};
    }
  `}
`

const TileSectionHeader = styled(TeamTileHeader)`
  flex-direction: row;
  justify-content: flex-start;
  border-width: 1px 0px 0px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  box-shadow: none;

  background-color: ${({ theme, expanded }) =>
    expanded ? theme.colors.c1 : theme.colors.c2};

  ${Title} {
    color: ${({ theme, expanded }) =>
      expanded ? theme.colors.c2 : theme.colors.c3};
    transition: all 0.2s;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.c2};
    ${Title} {
      color: ${({ theme }) => theme.colors.c3};
    }
    ${ExpandIcon} {
      color: ${({ theme }) => theme.colors.c3};
    }
  }
`

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0 0;
`

const DropdownWrapper = styled.div`
  width: 20vw;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.c3};
`

const StyledSelect = styled(Select)`
  width: 100%;
`

const Setting = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
`

const UserPhoto = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 5px;
  margin: 0;
`

const Dashboard = ({ history }) => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.api.getUserProjects)
  const myTeams = useSelector(selectors.api.getMyTeams)
  const user = useSelector(selectors.api.getUser)
  // const [emailSent, setEmailSent] = useState(false)
  const [stopModal, setStopModal] = useState(false)
  const [addMemberModal, setAddMemberModal] = useState(false)
  const [renameTeamModal, setRenameTeamModal] = useState(false)
  const [addProjectModal, setAddProjectModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [ownershipModal, setOwnershipModal] = useState(false)
  const [expandedTiles, setExpandedTiles] = useState(
    myTeams
      ? myTeams.reduce((tiles, team) => {
          tiles[team.id] = {
            isMembersActive: true,
            isProjectsActive: true,
          }
          return tiles
        }, {})
      : {}
  )
  const [teamId, setTeamId] = useState('')
  const [editTeamId, setEditTeamId] = useState()
  const [editMode, setEditMode] = useState('')
  const [newOwnerSelect, setNewOwnerSelect] = useState('')
  const [warningModal, setWarningModal] = useState({
    visible: false,
    content: null,
    onSubmit: null,
    buttonLabel: '',
  })
  const currentProject = projects.find(item => item.machineId)
  const currentProjectId = currentProject?.id
  const teamsObj = myTeams?.reduce((teams, team) => {
    return { ...teams, [team.id]: team }
  }, {})
  const teamProjects = myTeams?.reduce((projects, team) => {
    return { ...projects, [team.id]: team.projects }
  }, {})

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateTeams(), [])

  const updateTeams = () => {
    dispatch(
      query({
        name: 'myTeams',
        storeKey: 'myTeams',
        query: MY_TEAMS,
      })
    )
  }

  const shouldTabsBeCollapsable = Object.keys(teamsObj).length > 1

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const tabs = [
    {
      name: 'Teams',
      content: (
        <TilesWrapper>
          {Object.values(teamsObj).map(team => {
            const isExpanded = expandedTiles[team.id]
            const isOwner = team.owner.id === user.id
            return (
              <TeamTileWrapper key={team.id} expanded={isExpanded}>
                <TeamTileHeader expanded={isExpanded} shouldTabsBeCollapsable>
                  <Divider>
                    <VerticalDivider>
                      <Title>{team.name}</Title>
                      {isExpanded &&
                        (isOwner ? (
                          <StroveButton
                            isDashboard
                            padding="0px"
                            width="120px"
                            text="Settings"
                            onClick={() => {
                              handleSettingsClick(team.id)
                            }}
                          />
                        ) : (
                          <StroveButton
                            isPrimary
                            padding="5px"
                            width="120px"
                            onClick={() => {
                              setEditTeamId(team.id)
                              handleLeaveClick(team.id)
                            }}
                            text="Leave"
                          />
                        ))}
                    </VerticalDivider>
                    {Object.keys(teamsObj).length > 1 && (
                      <IconWrapper onClick={() => handleExpandTile(team.id)}>
                        <ExpandIcon type="down" expanded={isExpanded} />
                      </IconWrapper>
                    )}
                  </Divider>
                </TeamTileHeader>
                {isExpanded && (
                  <TeamTile>
                    <TileSectionHeader>
                      <Divider>
                        <SectionTitle>Members</SectionTitle>
                        <IconWrapper
                          onClick={() =>
                            handleExpandSection({
                              teamId: team.id,
                              type: 'Members',
                            })
                          }
                        >
                          <ExpandIcon
                            type="down"
                            expanded={
                              isExpanded &&
                              expandedTiles[team.id].isMembersActive
                            }
                            section
                          />
                        </IconWrapper>
                      </Divider>
                    </TileSectionHeader>
                    {isExpanded && expandedTiles[team.id].isMembersActive && (
                      <TeamTileSection>
                        <RowWrapper>
                          <Divider>
                            <VerticalDivider>
                              <UserPhoto
                                src={
                                  team.owner.photoUrl
                                    ? team.owner.photoUrl
                                    : StroveLogo
                                }
                              />
                              <Text>
                                {team.owner.name}
                                <InviteStatus>Team leader</InviteStatus>
                              </Text>
                            </VerticalDivider>
                          </Divider>
                        </RowWrapper>
                        {team?.users?.map(
                          member =>
                            member.name && (
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
                                    <DeleteButton
                                      onClick={() =>
                                        handleDeleteMemberClick({
                                          team,
                                          member,
                                        })
                                      }
                                    >
                                      Remove
                                    </DeleteButton>
                                  )}
                                </Divider>
                              </RowWrapper>
                            )
                        )}
                        {isOwner &&
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
                                    {member.name ? member.name : member.email}
                                    <InviteStatus>Invite pending</InviteStatus>
                                  </Text>
                                </VerticalDivider>
                                <DeleteButton
                                  onClick={() =>
                                    handleDeleteMemberClick({ team, member })
                                  }
                                >
                                  Cancel
                                </DeleteButton>
                              </Divider>
                            </RowWrapper>
                          ))}
                        {isOwner && (
                          <StroveButton
                            isPrimary
                            padding="5px"
                            width="120px"
                            onClick={() => handleAddMemberClick(team.id)}
                            text="Add member"
                          />
                        )}
                      </TeamTileSection>
                    )}
                    <TileSectionHeader isLast>
                      <Divider>
                        <SectionTitle>Projects</SectionTitle>
                        <IconWrapper
                          onClick={() =>
                            handleExpandSection({
                              teamId: team.id,
                              type: 'Projects',
                            })
                          }
                        >
                          <ExpandIcon
                            type="down"
                            expanded={
                              isExpanded &&
                              expandedTiles[team.id].isProjectsActive
                            }
                            section
                          />
                        </IconWrapper>
                      </Divider>
                    </TileSectionHeader>
                    {isExpanded && expandedTiles[team.id].isProjectsActive && (
                      <TeamTileSection isLast>
                        <Projects
                          projects={teamProjects[team.id]}
                          history={history}
                          updateTeams={updateTeams}
                        />
                        {isOwner && (
                          <StroveButton
                            isPrimary
                            padding="5px"
                            width="120px"
                            text="Add Project"
                            onClick={() => {
                              setTeamId(team.id)
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
          })}
          <StroveButton
            isPrimary
            padding="5px"
            width="120px"
            onClick={() => handleCreateTeamClick()}
            text="Create new team"
          />
        </TilesWrapper>
      ),
    },
    {
      name: 'Projects',
      content: <Projects projects={projects} history={history} />,
    },
  ]

  const handleCreateTeamClick = () => {
    setEditMode('Create team')
    setRenameTeamModal(true)
  }

  const createTeam = ({ name }) => {
    dispatch(
      mutation({
        name: 'createTeam',
        mutation: CREATE_TEAM,
        variables: { name },
        dataSelector: data => data,
        onSuccess: () => {
          updateTeams()
          setRenameTeamModal(false)
        },
      })
    )
  }

  const handleDeleteTeamClick = ({ teamId }) => {
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Are you sure you want to delete {teamsObj[teamId].name}? This process
          is irreversible.
        </ModalText>
      ),
      buttonLabel: 'Delete',
      onSubmit: () => deleteTeam({ teamId }),
    })
  }

  const deleteTeam = ({ teamId }) => {
    console.log('Second modal')
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Deleting the team will also cause deleting all of the team projects.
          Are you sure you want to proceed and delete {teamsObj[teamId].name}?
        </ModalText>
      ),
      buttonLabel: 'Delete',
      onSubmit: () =>
        dispatch(
          mutation({
            name: 'deleteTeam',
            mutation: DELETE_TEAM,
            variables: { teamId },
            onSuccess: () => {
              updateTeams()
              closeWarningModal()
            },
          })
        ),
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
      onSubmit: () =>
        deleteMember({
          member,
          team,
        }),
      buttonLabel: 'Remove',
    })
  }

  const deleteMember = ({ team, member }) =>
    dispatch(
      mutation({
        name: 'removeMember',
        mutation: REMOVE_MEMBER,
        variables: { teamId: team.id, memberId: member.id },
        onSuccess: () => {
          updateTeams()
          setWarningModal({
            visible: true,
            content: (
              <ModalText>
                {member.name} has been successfully removed from {team.name}
              </ModalText>
            ),
          })
        },
      })
    )

  const handleRenameTeamClick = id => {
    setEditTeamId(id)
    setEditMode('Rename team')
    setRenameTeamModal(true)
  }

  const renameTeam = ({ newName, teamId }) =>
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Are you sure you want to rename {teamsObj[teamId].name} to {newName}?
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
              teamId,
            },
            onSuccess: () => {
              updateTeams()
              setRenameTeamModal(false)
              closeWarningModal()
            },
          })
        ),
    })

  const handleAddMemberClick = id => {
    setEditTeamId(id)
    setAddMemberModal(true)
  }

  const addMember = ({ memberEmail, teamId }) => {
    const users = teamsObj[teamId].users
    const invited = teamsObj[teamId].invited

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
      dispatch(
        mutation({
          name: 'addMember',
          mutation: ADD_MEMBER,
          variables: { memberEmail, teamId },
          onSuccess: () => {
            updateTeams()
            setAddMemberModal(false)
          },
        })
      )
    }
  }

  const handleTransferOwnershipClick = () => {
    setOwnershipModal(true)
  }

  const transferOwnership = ({ teamId, newOwner }) => {
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Are you sure you want to transfer ownership of {teamsObj[teamId].name}{' '}
          to {newOwner.label}
        </ModalText>
      ),
      buttonLabel: 'Transfer',
      onSubmit: () =>
        dispatch(
          mutation({
            name: 'transferOwnership',
            mutation: TRANSFER_OWNERSHIP,
            variables: { teamId, newOwnerId: newOwner.values },
            onSuccess: () => {
              setWarningModal({
                visible: true,
                content: (
                  <ModalText>
                    You have successfully transfered ownership of{' '}
                    {teamsObj[teamId].name} to {newOwner.label}
                  </ModalText>
                ),
              })
              setOwnershipModal(false)
              updateTeams()
            },
          })
        ),
    })
  }

  const handleNewOwnerSelect = newOwner => setNewOwnerSelect(newOwner)

  const handleSettingsClick = id => {
    setEditTeamId(id)
    setSettingsModal(true)
  }

  const handleStopClick = id => {
    handleStopProject({ id, dispatch })
  }

  const handleLeaveClick = id => {
    setEditTeamId(id)
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Are you sure you want to leave team {teamsObj[id].name}?
        </ModalText>
      ),
      onSubmit: () => handleLeaveTeam(id),
      buttonLabel: 'Leave',
    })
  }

  const handleLeaveTeam = id => {
    dispatch(
      mutation({
        name: 'leaveTeam',
        mutation: LEAVE_TEAM,
        variables: { teamId: id },
        onSuccess: () => {
          updateTeams()
          closeWarningModal()
        },
      })
    )
  }

  const closeWarningModal = () => {
    setWarningModal({
      visible: false,
      content: null,
      onSubmit: null,
      buttonLabel: '',
    })
  }

  const closeSettingsModal = () => {
    setEditTeamId(null)
    setSettingsModal(false)
  }

  const closeAddProjectModal = () => setAddProjectModal(false)

  const handleExpandTile = teamId => {
    if (expandedTiles[teamId]) {
      const tiles = { ...expandedTiles }
      delete tiles[teamId]

      return setExpandedTiles(tiles)
    }

    setExpandedTiles({
      ...expandedTiles,
      [teamId]: { isMembersActive: false, isProjectsActive: false },
    })
  }

  const handleExpandSection = ({ teamId, type }) => {
    if (type === 'Members') {
      const isMembersActive = expandedTiles[teamId].isMembersActive
      return setExpandedTiles({
        ...expandedTiles,
        [teamId]: {
          ...expandedTiles[teamId],
          isMembersActive: !isMembersActive,
        },
      })
    }
    const isProjectsActive = expandedTiles[teamId].isProjectsActive
    return setExpandedTiles({
      ...expandedTiles,
      [teamId]: {
        ...expandedTiles[teamId],
        isProjectsActive: !isProjectsActive,
      },
    })
  }

  return (
    <>
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
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
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
          onSubmit={values =>
            addMember({ memberEmail: values.email, teamId: editTeamId })
          }
        >
          {({ errors, touched, values }) => (
            <StyledForm>
              <EmailFormWrapper
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
              </EmailFormWrapper>
              {/* {emailSent && (
                <StyledInfo>Your team invitation has been sent</StyledInfo>
              )} */}
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
        width={isMobileOnly ? '80vw' : '40vw'}
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={settingsModal}
        onRequestClose={() => closeSettingsModal()}
        contentLabel="Team settings"
        ariaHideApp={false}
      >
        <Title>Team settings</Title>
        <WarningText>
          This section contains dangerous settings. Be careful while working
          with them.
        </WarningText>
        <StroveButton
          isPrimary
          padding="5px"
          margin="0px 0px 5px 0px"
          onClick={() => handleRenameTeamClick(editTeamId)}
          text="Rename team"
        />
        <StroveButton
          isPrimary
          padding="5px"
          margin="0px 0px 5px 0px"
          onClick={() => handleTransferOwnershipClick(false)}
          text="Transfer ownership"
        />
        <StroveButton
          isDelete
          padding="5px"
          margin="0px 0px 5px 0px"
          onClick={() => handleTransferOwnershipClick(false)}
          text="Delete team"
        />

        <ModalButton
          onClick={() => closeSettingsModal()}
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
            if (editMode === 'Rename team')
              renameTeam({ newName: values.name, teamId: editTeamId })
            else createTeam({ name: values.name })
          }}
        >
          {({ errors, touched, values }) => (
            <StyledForm>
              <EmailFormWrapper
                disabled={errors.name || !values.name}
                isMobile={isMobileOnly}
              >
                <Field
                  type="name"
                  name="name"
                  placeholder={
                    editMode === 'Rename team' ? 'New team name' : 'Team name'
                  }
                ></Field>
                <StroveButton
                  isPrimary
                  type="submit"
                  layout="form"
                  text={editMode === 'Rename team' ? 'Rename' : 'Create'}
                  disabled={errors.name || !values.name}
                />
              </EmailFormWrapper>
              {/* {emailSent && (
                <StyledInfo>Your team invitation has been sent</StyledInfo>
              )} */}
            </StyledForm>
          )}
        </Formik>
        <ModalButton
          onClick={() => setRenameTeamModal(false)}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>

      <Modal
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={ownershipModal}
        onRequestClose={() => setOwnershipModal(false)}
        contentLabel="Transfer ownership"
        ariaHideApp={false}
      >
        <SettingWrapper>
          <Setting>
            <DropdownWrapper>
              <StyledSelect
                value={newOwnerSelect}
                onChange={handleNewOwnerSelect}
                options={teamsObj[editTeamId]?.users
                  ?.map(user => ({
                    values: user.id,
                    label: user.name,
                  }))
                  .filter(user => user.label)}
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
            transferOwnership({
              teamId: editTeamId,
              newOwner: newOwnerSelect,
            })
          }
          text="Transfer ownership"
          padding="5px"
          maxWidth="150px"
        />
        <ModalButton
          onClick={() => setOwnershipModal(false)}
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
        onRequestClose={() =>
          setWarningModal({
            visible: false,
            content: null,
            onSubmit: null,
            buttonLabel: '',
          })
        }
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
        <ModalButton
          onClick={() => closeWarningModal()}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>

      <StyledReactModal
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
        <GetStarted closeModal={closeAddProjectModal} teamId={teamId} />
      </StyledReactModal>
    </>
  )
}

export default memo(withRouter(Dashboard))
