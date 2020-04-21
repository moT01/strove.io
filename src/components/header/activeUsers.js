import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import StroveLogo from 'images/stroveReversed.png'

const UserPhoto = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 3px 0 0;
  cursor: help;
`

const UserPhotoContainer = styled.div`
  height: 100%;
  width: auto;
  margin-left: 2px;
  max-width: 300px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
`

const ActiveUsers = () => {
  const activeProjectFromSubscription = useSelector(
    selectors.currentProject.getCurrentProject
  ).data?.data?.activeProject
  const activeProjectFromQuery = useSelector(selectors.api.getCurrentProject)
  const currentProject = activeProjectFromSubscription || activeProjectFromQuery
  const projects = useSelector(selectors.api.getProjects)
  const originalProject = projects.find(
    project => project?.id === currentProject?.startedCollaborationFromId
  )
  const activeUsers = activeProjectFromSubscription
    ? currentProject.workingUsers
    : originalProject?.workingUsers

  return (
    <Wrapper>
      {activeUsers?.map(user => (
        <UserPhotoContainer key={user.name} title={user.name}>
          <UserPhoto src={user.photoUrl ? user.photoUrl : StroveLogo} />
        </UserPhotoContainer>
      ))}
    </Wrapper>
  )
}

export default memo(ActiveUsers)
