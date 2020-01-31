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

const PersonalTeam = () => {
    return (
        <TeamTileWrapper expanded={isExpanded}>
                        <TeamTileHeader
                          expanded={isExpanded}
                          shouldTabsBeCollapsable
                        >
                          <Divider>
                            <VerticalDivider>
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
                                    margin="0 0 0 10px"
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
                            {/* {shouldTabsBeCollapsable && ( */}
                            <IconWrapper
                              onClick={() =>
                                displayHandler({
                                  organizationId: organization.id,
                                  teamId: team.id,
                                })
                              }
                            >
                              <ExpandIcon type="down" expanded={isExpanded} />
                            </IconWrapper>
                            {/* )} */}
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
                              </Divider>
                            </TileSectionHeader>
                            {expandedTiles[organization.id].teams[team.id]
                              .sections.projects && (
                              <TeamTileSection isLast>
                                <Projects
                                  projects={
                                    organizationsObj[organization.id].teams[
                                      team.id
                                    ].projects &&
                                    Object.values(
                                      organizationsObj[organization.id].teams[
                                        team.id
                                      ].projects
                                    )
                                  }
                                  history={history}
                                  updateTeams={updateTeams}
                                  updateOrganizations={updateOrganizations}
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
}

export default memo(withRouter(PersonalTeam))
