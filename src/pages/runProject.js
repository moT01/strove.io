import React, { memo, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { selectors, actions } from 'state'
import {
  StroveButton,
  AddProjectProvider,
  PoweredBy,
  NoRepoUrlInfo,
  FullScreenWrapper,
  MenuWrapper,
} from 'components'
import { getRepoUrl, getWindowSearchParams } from 'utils'

const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

const StyledButton = styled(StroveButton)`
  height: 60px;
  width: 300px;
  > svg {
    fill: ${({ theme }) => theme.colors.c2};
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
`

const Run = ({ addProject, history }) => {
  const myOrganizations = useSelector(selectors.api.getOwnedOrganizations)
  // const user = useSelector(selectors.api.getUser)
  const token = useSelector(selectors.getToken)
  const dispatch = useDispatch()
  const ownOrganization = myOrganizations?.[0]
  const lastTeam = ownOrganization?.teams[ownOrganization.teams.length - 1]
  const teamId = lastTeam?.id
  const searchParams = getWindowSearchParams()
  const repoUrl = getRepoUrl()
  /* Specify the route a user should be redirected to */
  const goBackTo = searchParams.get('goBackTo') || ''

  const setEditedOrganization = ({ team }) => {
    dispatch(
      actions.editedOrganization.setEditedOrganization({
        organization: myOrganizations[team.organizationId],
        team,
      })
    )
  }

  if (!token) {
    // If user is logged in, redirect to the embed project run
    history.push(`/embed/?repoUrl=${repoUrl}&goBackTo=${goBackTo}`)
  }
  // eslint-disable-next-line
  useEffect(() => setEditedOrganization({ team: lastTeam }), [])

  const onClick = () => {
    addProject({ link: repoUrl, teamId })
  }

  return (
    <FullScreenWrapper>
      <MenuWrapper>
        {!repoUrl ? (
          <NoRepoUrlInfo />
        ) : (
          <StyledButton isPrimary onClick={onClick}>
            <LoginText invert>Run with Strove</LoginText>
          </StyledButton>
        )}
        <PoweredBy />
      </MenuWrapper>
    </FullScreenWrapper>
  )
}

/*
  Repo are passed via repoLink parameter.
  For example, to open strove website use:
  https://strove.io/embed/runProject/?repoUrl=https://github.com/stroveio/strove.io
*/
export default memo(
  withRouter(({ history }) => (
    <AddProjectProvider>
      {({ addProject }) => <Run addProject={addProject} history={history} />}
    </AddProjectProvider>
  ))
)
