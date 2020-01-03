import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'

import {
  NoRepoUrlInfo,
  ExternalLink,
} from 'components'
import { selectors } from 'state'
import { getWindowSearchParams, getRepoUrl } from 'utils'

const getToken = selectors.api.getUserField('siliskyToken')

const MenuWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
  z-index: 3;
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

const FromEmailInvitaiton = () => {
	const searchParams = getWindowSearchParams()
	const token = useSelector(getToken)
	
	const teamName = searchParams.get('teamName')
  const email = searchParams.get('email')

  return (
    <Wrapper>
      <MenuWrapper invert>
        {repoUrl ? (
          <ExternalLink
            primary
            href={`/fromEmbed/login/?repoUrl=${repoUrl}&goBackTo=${goBackTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LoginText invert>Login to start coding</LoginText>
          </ExternalLink>
        ) : (
          <NoRepoUrlInfo />
        )}
      </MenuWrapper>
    </Wrapper>
  )
}

export default memo(FromEmailInvitaiton)
