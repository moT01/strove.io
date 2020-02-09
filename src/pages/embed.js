import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'

import {
  NoRepoUrlInfo,
  PoweredBy,
  ExternalLink,
  FullScreenWrapper,
  MenuWrapper,
} from 'components'
import { selectors } from 'state'
import { getWindowSearchParams, getRepoUrl } from 'utils'

const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

const EmbedWrapper = () => {
  const token = useSelector(selectors.getToken)

  const searchParams = getWindowSearchParams()
  const repoUrl = getRepoUrl()
  const defaultGoBackTo =
    window.location !== window.parent.location
      ? document.referrer
      : document.location.href
  /* Specify the route a user should be redirected to */
  const goBackTo = searchParams.get('goBackTo') || defaultGoBackTo

  /* This is a perfectly viable code but it should wait till ancestorOrigins gets better browser support
  const goBackToRoute = searchParams.get('goBackToRoute') || ''
  const parentDomain =
    window.location !== window.parent.location
      ? document.location.ancestorOrigins[0]
      : process.env.REACT_APP_STROVE_URL.slice(0, -1)
  const goBackTo = `${parentDomain}/${goBackToRoute}`
   */

  if (token && repoUrl) {
    // If user is logged in, redirect to the embed project run
    return (
      <Redirect
        to={`/embed/runProject/?repoUrl=${repoUrl}&goBackTo=${goBackTo}`}
      />
    )
  }

  return (
    <FullScreenWrapper>
      <MenuWrapper>
        {repoUrl ? (
          <ExternalLink
            primary
            href={`/fromEmbed/login/?repoUrl=${repoUrl}&goBackTo=${goBackTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LoginText>Login to start coding</LoginText>
          </ExternalLink>
        ) : (
          <NoRepoUrlInfo />
        )}
        <PoweredBy />
      </MenuWrapper>
    </FullScreenWrapper>
  )
}

export default memo(EmbedWrapper)
