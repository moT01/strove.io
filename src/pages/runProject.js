import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { selectors } from 'state'
import { StroveButton, AddProjectProvider, PoweredBy, NoRepoUrlInfo } from 'components'
import { getRepoUrl, getWindowSearchParams } from 'utils'

const getToken = selectors.api.getUserField('siliskyToken')

const MenuWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
  position: relative;
`

const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

const Wrapper = styled.div`
  display: flex;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
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
  const token = useSelector(getToken)

  const searchParams = getWindowSearchParams()
  const repoUrl = getRepoUrl()
  /* Specify the route a user should be redirected to */
  const goBackTo = searchParams.get('goBackTo') || ''

  if (!token) {
    // If user is logged in, redirect to the embed project run
    history.push(`/embed/?repoUrl=${repoUrl}&goBackTo=${goBackTo}`)
  }

  const onClick = () => {
    addProject({ link: repoUrl })
  }

  return (
    <Wrapper>
      <MenuWrapper invert>
        {!repoUrl ? (
          <NoRepoUrlInfo/>
        ) :(
          <StyledButton isPrimary onClick={onClick}>
            <LoginText invert>Run with Strove</LoginText>
          </StyledButton>
        )}
        <PoweredBy />
      </MenuWrapper>
    </Wrapper>
  )
}

/*
  Repo are passed via repoLink parameter.
  For example, to open strove website use:
  https://strove.io/embed/runProject/?repoUrl=https://github.com/stroveio/strove.io
*/
export default memo(withRouter(({ history }) => (
  <AddProjectProvider>
    {({ addProject }) => <Run addProject={addProject} history={history} />}
  </AddProjectProvider>
)))
