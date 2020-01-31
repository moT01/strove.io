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
import { useAnalytics } from 'hooks'
import {
  ADD_MEMBER,
  CREATE_TEAM,
  RENAME_TEAM,
  REMOVE_MEMBER,
  MY_TEAMS,
  DELETE_TEAM,
  SET_ADMIN,
  LEAVE_TEAM,
  MY_ORGANIZATIONS,
} from 'queries'
import { selectors } from 'state'
import Modal from './modal'
import { GetStarted, Projects } from 'components'
import SEO from './seo'
import StroveButton from 'components/stroveButton.js'
import Header from './header/header'
import Footer from './footer'
import StroveLogo from 'images/strove.png'

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const TeamTileWrapper = styled(Wrapper)`
  margin: 20px 0px;
  transition: all 0.2s;
  width: 100%;
  height: ${({ expanded }) => (expanded ? 'auto' : '2.5rem')};
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-radius: 5px;
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

const Title = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.c3};
  margin: 3px 3px 3px 0;
`

const SectionTitle = styled(Title)`
  font-size: 1.2rem;
  font-weight: 400;
`

const TeamTileHeader = styled(Tile)`
  width: 100%;
  margin: 0;
  padding: 10px;
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
    padding: 0;
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

const TeamTile = styled(Tile)`
  width: 100%;
  padding: 0px;
  margin: 0px;
  border-top: none;
`

const TeamTileSection = styled(Tile)`
  align-items: flex-start;
  margin: 0px;
  padding: 10px;
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  border-width: 1px 0px 0px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  width: 100%;
  box-shadow: none;
  padding-bottom: 0;
`

const IconWrapper = styled(Wrapper)`
  min-width: 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  margin-right: 5px;

  i {
    line-height: 0;
  }
`

const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: ${({ columnOnMobile }) =>
    columnOnMobile && isMobileOnly ? 'column' : 'row'};
`

const Divider = styled(VerticalDivider)`
  justify-content: space-between;
  flex-direction: ${({ columnOnMobile }) =>
    columnOnMobile && isMobileOnly ? 'column' : 'row'};
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

const ModalButton = styled(StroveButton)`
  animation: ${FullFadeIn} 0.2s ease-out;
  border-radius: 2px;
  max-width: 150px;
  padding: 5px;
`

const WarningText = styled(ModalText)`
  color: ${({ theme }) => theme.colors.c5};
  margin-bottom: 5px;
  word-break: break-word;
`

const RowWrapper = styled(VerticalDivider)`
  border-width: 0px 0px 1px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-style: solid;
  min-height: 60px;

  :last-of-type {
    border: none;
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

const UserPhoto = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin: 0;
  margin-left: 10px;
`

const emptyWarningModalContent = {
  visible: false,
  content: null,
  onSubmit: null,
  buttonLabel: '',
}

const PersonalTeam = ({ history, teams, updateTeams }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [addProjectModal, setAddProjectModal] = useState(false)
  const [warningModal, setWarningModal] = useState(emptyWarningModalContent)
  const [editTeam, setEditTeam] = useState()
  const [settingsModal, setSettingsModal] = useState()
  const [teamId, setTeamId] = useState()

  const closeAddProjectModal = () => setAddProjectModal(false)

  // add pricing button
  const handleAddMemberClick = () => {
    setWarningModal({
      visible: true,
      content: (
        <ModalText>
          Adding team members is not available in free plan. Please visit our
          pricing page for more information
        </ModalText>
      ),
    })
  }

  const handleSettingsClick = team => {
    setEditTeam(team)
    setSettingsModal(true)
  }

  const closeWarningModal = () => {
    setWarningModal(emptyWarningModalContent)
  }

  const shouldTabsBeCollapsable = Object.keys(teams).length > 1

  return (
    <>
      {teams.map(team => {
        const teamProjects = team.projects
        return (
          <TeamTileWrapper expanded={isExpanded}>
            <TeamTileHeader expanded={isExpanded} shouldTabsBeCollapsable>
              <Divider>
                <VerticalDivider columnOnMobile>
                  <Title>{team.name}</Title>
                  {isExpanded && (
                    <StroveButton
                      isPrimary
                      padding="5px"
                      minWidth="150px"
                      maxWidth="150px"
                      margin="10px"
                      borderRadius="2px"
                      onClick={handleAddMemberClick}
                      text="Add member"
                    />
                  )}
                  {isExpanded && (
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
                  )}
                </VerticalDivider>
                {shouldTabsBeCollapsable && (
                  <IconWrapper onClick={() => setIsExpanded(!isExpanded)}>
                    <ExpandIcon type="down" expanded={isExpanded} />
                  </IconWrapper>
                )}
              </Divider>
            </TeamTileHeader>
            {isExpanded && (
              <TeamTile>
                <TileSectionHeader isLast>
                  <Divider>
                    <SectionTitle>Projects</SectionTitle>
                  </Divider>
                </TileSectionHeader>
                {isExpanded && (
                  <TeamTileSection isLast>
                    <Projects
                      projects={teamProjects}
                      history={history}
                      updateTeams={updateTeams}
                    />
                    <StroveButton
                      isPrimary
                      padding="5px"
                      minWidth="150px"
                      maxWidth="150px"
                      margin="10px"
                      borderRadius="2px"
                      text="Add Project"
                      onClick={() => {
                        setTeamId(team.id)
                        setAddProjectModal(true)
                      }}
                    />
                  </TeamTileSection>
                )}
              </TeamTile>
            )}
          </TeamTileWrapper>
        )
      })}
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
      <Modal
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
        height={isMobileOnly ? '30vh' : '20vh'}
        isOpen={warningModal.visible}
        onRequestClose={() => setWarningModal(emptyWarningModalContent)}
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
          onClick={closeWarningModal}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>
    </>
  )
}

export default memo(withRouter(PersonalTeam))
