import React, { useState, memo } from 'react'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { withRouter } from 'react-router-dom'

import { Modal, StroveButton, GetStarted } from 'components'

import Projects from './projects'
import {
  ExpandIcon,
  TeamTileWrapper,
  Title,
  SectionTitle,
  TeamTileHeader,
  TileSectionHeader,
  TeamTile,
  TeamTileSection,
  Divider,
  VerticalDivider,
  IconWrapper,
  ModalText,
  ModalButton,
  StyledCloseIcon,
  StyledReactModal,
} from './styled'

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
        <TeamTileWrapper>
          <ModalText>
            Adding team members is not available in free plan. Please visit our
            pricing page for more information
          </ModalText>
          <StroveButton
            isDashboard
            isLink
            padding="5px"
            minWidth="150px"
            maxWidth="150px"
            borderRadius="2px"
            margin="0 0 0 10px"
            to="/pricing"
            text="Pricing"
          />
        </TeamTileWrapper>
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
