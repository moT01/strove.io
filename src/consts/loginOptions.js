import React from 'react'

import { getWindowHref } from 'utils'
import { Github, Bitbucket, Gitlab } from 'images/logos'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const REACT_APP_GITLAB_CLIENT_ID = process.env.REACT_APP_GITLAB_CLIENT_ID
const BITBUCKET_CLIENT_ID = process.env.BITBUCKET_CLIENT_ID
const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
const IS_OPENSOURCE = process.env.IS_OPENSOURCE
const SILISKY_URL = process.env.SILISKY_URL

/* Catch route such as strove.io/app/dashboard/ */
const address = getWindowHref()?.split('?')[0]

/*
  State in href controls login behavior https://auth0.com/docs/protocols/oauth2/oauth-state
  EmbedHref redirects to a route that will redirect user further back once he logs in
*/
export default [
  {
    value: 'github',
    label: 'Github',
    href: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github,${IS_OPENSOURCE},${address}`,
    embedHref: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github,true,${SILISKY_URL}fromEmbed/goBackTo/`,
    icon: <Github />,
  },
  {
    value: 'bitbucket',
    label: 'Bitbucket',
    href: `https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket,${IS_OPENSOURCE},${address}`,
    embedHref: `https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket,true,${SILISKY_URL}fromEmbed/goBackTo/`,
    icon: <Bitbucket />,
  },
  {
    value: 'gitlab',
    label: 'Gitlab',
    href: `https://gitlab.com/oauth/authorize?client_id=${REACT_APP_GITLAB_CLIENT_ID}&REACT_APP_REDIRECT_URI=${REACT_APP_REDIRECT_URI}&response_type=code&state=gitlab,${IS_OPENSOURCE},${address}`,
    embedHref: `https://gitlab.com/oauth/authorize?client_id=${REACT_APP_GITLAB_CLIENT_ID}&REACT_APP_REDIRECT_URI=${REACT_APP_REDIRECT_URI}&response_type=code&state=gitlab,true,${SILISKY_URL}fromEmbed/goBackTo/`,
    icon: <Gitlab />,
  },
]
