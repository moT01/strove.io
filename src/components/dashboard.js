import React, { useState, useEffect, memo } from 'react'
import styled, { keyframes, css } from 'styled-components/macro'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import dayjs from 'dayjs'
import isEmail from 'validator/lib/isEmail'
import { Formik, Form, Field } from 'formik'
import { withRouter, Link } from 'react-router-dom'

import { mutation, handleStopProject } from 'utils'
import { DELETE_PROJECT, CONTINUE_PROJECT, ADD_MEMBER } from 'queries'
import { actions } from 'state'
import { C } from 'state'
import { selectors } from 'state'
import Modal from './modal'
import GetStarted from './getStarted'
import SEO from './seo'
import StroveButton from 'components/stroveButton.js'
import Header from './header/header'

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
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
    padding-left: 64px;
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

const StyledInfo = styled.span`
  margin: 20px;
  color: ${({ theme }) => theme.colors.c13};
  font-size: 13px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const PageWrapper = styled(Wrapper)`
  width: 100%;
  padding-top: 5vh;
  flex-direction: ${({ isAdmin }) => (isAdmin ? 'row' : 'column')};
`

const TeamTileWrapper = styled(Wrapper)`
  margin: 20px 0px;
  transition: all 0.2s;
  width: 50%;
  height: ${({ expanded }) => (expanded ? 'auto' : '2.5rem')};
`

const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2vh;
  margin: 2vh;
  animation: ${FullFadeIn} 0.5s ease-out;
`

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.c1};
  margin: 0.3vh 0.3vh 0.3vh 0;
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
  box-shadow: ${({ expanded, theme }) =>
    expanded ? '0' : ` 0 1.5vh 1.5vh -1.5vh ${theme.colors.c1}`};
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
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`

const TeamTileSection = styled(Tile)`
  align-items: flex-start;
  margin: 0px;
  padding: 5px;
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  border-width: ${({ isLast }) =>
    isLast ? '1px 0px 0px 0px' : ' 1px 0px 1px 0px'};
  border-color: rgba(0, 114, 206, 0.4);
  width: 100%;
  box-shadow: none;
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
  align-items: center;
  width: 100%;
  height: 100%;
`

const TeamHeaderDivider = styled(VerticalDivider)`
  flex-direction: row;
  justify-content: space-between;
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

const IconWrapper = styled(Wrapper)`
  width: 8%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-width: 0px 0px 0px 1px;
  border-color: rgba(0, 114, 206, 0.6);
  border-style: solid;
`

const ExpandIcon = styled(StyledIcon)`
  font-size: 1rem;
  transform: ${({ expanded }) =>
    expanded ? ' rotate(180deg)' : 'rotate(0deg)'};
  color: ${({ theme, expanded }) =>
    expanded ? theme.colors.c2 : theme.colors.c1};
  transition: all 0.2s;
  :focus {
    outline: none;
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
  background-color: ${({ theme, expanded }) =>
    expanded ? theme.colors.c1 : theme.colors.c2};

  ${ProjectTitle} {
    color: ${({ theme, expanded }) =>
      expanded ? theme.colors.c2 : theme.colors.c1};
    transition: all 0.2s;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.c1};
    cursor: pointer;
    ${ProjectTitle} {
      color: ${({ theme }) => theme.colors.c2};
    }
    ${ExpandIcon} {
      color: ${({ theme }) => theme.colors.c2};
    }
  }
`

const TileSectionHeader = styled(TeamTileHeader)`
  flex-direction: row;
  justify-content: flex-start;
  border-width: 0px;
  border-color: rgba(0, 114, 206, 0.6);
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  box-shadow: none;

  background-color: ${({ theme, expanded }) =>
    expanded ? theme.colors.c1 : theme.colors.c2};

  ${ProjectTitle} {
    color: ${({ theme, expanded }) =>
      expanded ? theme.colors.c2 : theme.colors.c1};
    transition: all 0.2s;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.c2};
    cursor: pointer;
    ${ProjectTitle} {
      color: ${({ theme }) => theme.colors.c1};
    }
    ${ExpandIcon} {
      color: ${({ theme }) => theme.colors.c1};
    }
  }
`

const Dashboard = ({ history }) => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.api.getUserProjects)
  const [emailSent, setEmailSent] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [stopModal, setStopModal] = useState(false)
  const [addMemberModal, setAddMemberModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const [expandedTiles, setExpandedTiles] = useState([])
  const [expandedSection, setExpandedSection] = useState(null)
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const currentProject = projects.find(item => item.machineId)
  const currentProjectId = currentProject?.id
  const projectsLimit = 20
  const isAdmin = true

  const members = [
    { name: 'Member 1', teams: ['123', '234'] },
    { name: 'Member 2', teams: ['123'] },
    { name: 'Member 3', teams: ['234'] },
    { name: 'Member 4', teams: ['234'] },
  ]

  const team1Members = members.filter(
    member => member.teams.indexOf('123') !== -1
  )

  const team2Members = members.filter(
    member => member.teams.indexOf('234') !== -1
  )

  const teams = [
    { name: 'Team 1', id: '123', members: team1Members },
    {
      name: 'Team 2',
      id: '234',
      members: team2Members,
    },
  ]

  const tabs = [
    {
      name: 'Teams',
      content: (
        <TilesWrapper>
          <ProjectTitle>Admin console</ProjectTitle>
          {teams.map(team => {
            const isExpanded = expandedTiles.findIndex(x => x.id === team.id) !== -1
            return (
              <TeamTileWrapper key={team.id} expanded={isExpanded}>
                <TeamTileHeader isAdmin={isAdmin} expanded={isExpanded}>
                  <TeamHeaderDivider>
                    <ProjectTitle>{team.name}</ProjectTitle>
                    <IconWrapper onClick={() => handleExpandTile(team.id)}>
                      <ExpandIcon type="down" expanded={isExpanded} />
                    </IconWrapper>
                  </TeamHeaderDivider>
                </TeamTileHeader>
                {isExpanded && (
                  <TeamTile>
                    <TileSectionHeader
                      onClick={() => handleExpandSection(team, 'Members')}
                    >
                      <ProjectTitle>Members</ProjectTitle>
                    </TileSectionHeader>
                    {isExpanded && expandedSection === 'Members' && (
                      <TeamTileSection>
                        <StroveButton
                          isPrimary
                          padding="0.5vh"
                          width="20%"
                          onClick={() => setAddMemberModal(true)}
                          text="Add member"
                        />
                        {team.members.map(member => (
                          <Text key={member.name}>{member.name}</Text>
                        ))}
                      </TeamTileSection>
                    )}
                    <TileSectionHeader
                      onClick={() => handleExpandSection('Projects')}
                      isLast
                    >
                      <ProjectTitle>Projects</ProjectTitle>
                    </TileSectionHeader>
                    {isExpanded && expandedSection === 'Projects' && (
                      <TeamTileSection isLast>
                        <StroveButton
                          isPrimary
                          padding="0.5vh"
                          width="20%"
                          onClick={() => setAddMemberModal(true)}
                          text="Add member"
                        />
                        {team.members.map(member => (
                          <Text key={member.name}>{member.name}</Text>
                        ))}
                      </TeamTileSection>
                    )}
                  </TeamTile>
                )}
              </TeamTileWrapper>
            )
          })}
        </TilesWrapper>
      ),
    },
    {
      name: 'Projects',
      content: (
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
      ),
    },
  ]

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

  const handleExpandTile = teamId => {
    expandedTiles.findIndex(x => x.id === teamId) === -1
      ? setExpandedTiles([...expandedTiles, {id: teamId, isMA: false, isPA: false}])
      : setExpandedTiles(expandedTiles.filter(tile => tile.id !== teamId))
  }

  const handleExpandSection = (team, section) => {}

  return (
    <>
      <SEO title="Dashboard" />
      <Header />
      <PageWrapper isAdmin={isAdmin}>
        {isAdmin ? (
          <>{tabs[tabs.findIndex(tab => tab.name === 'Teams')].content}</>
        ) : (
          <>
            {/* <TrialInfoWrapper>
            Your workspace is currently on the free version of Strove.{' '}
            <StyledLink to="/pricing">See upgrade options</StyledLink>
          </TrialInfoWrapper> */}
            <GetStarted />
            {tabs[tabs.findIndex(tab => tab.name === 'Projects')].content}
          </>
        )}
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
      <Modal
        width={isMobileOnly ? '80vw' : '40vw'}
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={addMemberModal}
        onRequestClose={() => setAddMemberModal(false)}
        contentLabel="Stop project?"
        ariaHideApp={false}
      >
        <Formik
          initialValues={{
            email: '',
          }}
          validate={validate}
          onSubmit={values => {
            dispatch(
              mutation({
                name: 'addMember',
                context: null,
                mutation: ADD_MEMBER,
                variables: { memberEmail: values.email, teamId: '2' },
                onSuccess: () => {
                  setEmailSent(true)
                  setAddMemberModal(false)
                },
              })
            )
          }}
        >
          {({ errors, touched, values }) => (
            <StyledForm>
              <EmailFormWrapper
                disabled={errors.email || !values.email}
                isMobile={isMobileOnly}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
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
              {emailSent && (
                <StyledInfo>Your team invitation has been sent</StyledInfo>
              )}
            </StyledForm>
          )}
        </Formik>
        <ModalButton
          onClick={() => setAddMemberModal(false)}
          text="Close"
          padding="0.5vh"
          maxWidth="150px"
        />
      </Modal>
    </>
  )
}

export default memo(withRouter(Dashboard))
