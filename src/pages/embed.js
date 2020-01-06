import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'

import { NoRepoUrlInfo, PoweredBy, StroveButton } from 'components'
import { selectors } from 'state'
import { getWindowSearchParams, getRepoUrl, openPopup } from 'utils'

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

let embedLoginTab
const EmbedWrapper = () => {
  const token = useSelector(getToken)

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
    embedLoginTab && embedLoginTab.close()
    // If user is logged in, redirect to the embed project run
    return (
      <Redirect
        to={`/embed/runProject/?repoUrl=${repoUrl}&goBackTo=${goBackTo}`}
      />
    )
  }

  return (
    <Wrapper>
      <MenuWrapper invert>
        {repoUrl ? (
          <StroveButton
            primary
            padding="15px 30px"
            onClick={() => {
              embedLoginTab = openPopup(
                `/fromEmbed/login/?repoUrl=${repoUrl}&goBackTo=${goBackTo}`,
                '_blank',
                '320',
                '400'
              )
            }}
          >
            <LoginText invert>Login to start coding</LoginText>
          </StroveButton>
        ) : (
          <NoRepoUrlInfo />
        )}
        <PoweredBy />
      </MenuWrapper>
    </Wrapper>
  )
}

export default memo(EmbedWrapper)
