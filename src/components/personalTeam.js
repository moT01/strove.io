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

const PersonalTeam = ({ history, team }) => {
  const [display, setDisplay] = useState()
  const displayHandler = section => {
    section
      ? setDisplay({ team: true, section: !display.section })
      : setDisplay({ team: !display.team, section: false })
  }

  return (
    <TeamTileWrapper expanded={isExpanded}>
      <TeamTileHeader expanded={isExpanded} shouldTabsBeCollapsable>
        <Divider>
          <VerticalDivider>
            <Title>{team.name}</Title>
            {isExpanded && (
              <StroveButton
                isPrimary
                padding="5px"
                minWidth="150px"
                maxWidth="150px"
                margin="10px"
                borderRadius="2px"
                onClick={() => handleAddMemberClick()}
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
                margin="0 0 0 10px"
                text="Settings"
                onClick={() => {
                  handleSettingsClick(team)
                }}
              />
            )}
          </VerticalDivider>
          {/* {shouldTabsBeCollapsable && ( */}
          <IconWrapper onClick={() => displayHandler()}>
            <ExpandIcon type="down" expanded={isExpanded} />
          </IconWrapper>
          {/* )} */}
        </Divider>
      </TeamTileHeader>
      {isExpanded && (
        <TeamTile>
          {isExpanded && (
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
                    <Text>{team.teamLeader?.name}</Text>
                  </VerticalDivider>
                </Divider>
              </RowWrapper>
            </TeamTileSection>
          )}
          <TileSectionHeader isLast>
            <Divider>
              <SectionTitle>Projects</SectionTitle>
              <IconWrapper onClick={() => displayHandler('projects')}>
                <ExpandIcon
                  type="down"
                  expanded={isExpanded.projects}
                  section
                />
              </IconWrapper>
            </Divider>
          </TileSectionHeader>
          {isExpanded.projects && (
            <TeamTileSection isLast>
              <Projects
                projects={teamProjects}
                history={history}
                updateTeams={updateTeams}
                updateOrganizations={updateOrganizations}
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
}

export default memo(withRouter(PersonalTeam))
