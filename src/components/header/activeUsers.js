import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectors } from 'state'

const UserPhoto = styled.img`
  width: ${isMobileOnly ? '15px' : '20px'};
  height: ${isMobileOnly ? '15px' : '20px'};
  margin: 0;
`

const UserPhotoContainer = styled.div`
  height: 100%;
  width: auto;
  margin-left: 2px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
`

const ActiveUsers = () => {
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const projects = useSelector(selectors.api.getProjects)
  const originalProject = projects.find(
    project => project?.id === currentProject?.startedCollaborationFromId
  )
  const activeUsers = originalProject?.workingUsers
  return (
    <Wrapper>
      {activeUsers?.map(user => (
        <UserPhotoContainer key={user.name}>
          <UserPhoto src={user.photoUrl} />
        </UserPhotoContainer>
      ))}
    </Wrapper>
  )
}

export default memo(ActiveUsers)
