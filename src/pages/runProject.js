import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { selectors } from 'state'
import {
  StroveButton,
  AddProjectProvider,
  PoweredBy,
  NoRepoUrlInfo,
  FullScreenWrapper,
  MenuWrapper,
} from 'components'
import { getRepoUrl, getWindowSearchParams } from 'utils'
import { TeamTileSection } from './dashboard/styled'

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
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const token = useSelector(selectors.getToken)
  const lastOrganization = myOrganizations[myOrganizations.length - 1]
  console.log('TCL: Run -> lastOrganization', lastOrganization)
  const lastTeam = lastOrganization.teams[lastOrganization.teams.length - 1]
  console.log('TCL: Run -> lastTeam', lastTeam)
  const teamId = lastTeam.id
  console.log('TCL: Run -> teamId', teamId)
  const searchParams = getWindowSearchParams()
  const repoUrl = getRepoUrl()
  /* Specify the route a user should be redirected to */
  const goBackTo = searchParams.get('goBackTo') || ''

  if (!token) {
    // If user is logged in, redirect to the embed project run
    history.push(`/embed/?repoUrl=${repoUrl}&goBackTo=${goBackTo}`)
  }

  const onClick = () => {
    console.log('Yeeeeeeeeeeehaw, link and team id', repoUrl, teamId)
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
