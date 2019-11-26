import React from 'react'

import { getWindowHref } from 'utils'
import { Github, Bitbucket, Gitlab } from 'images/logos'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITLAB_CLIENT_ID = process.env.GITLAB_CLIENT_ID
const BITBUCKET_CLIENT_ID = process.env.BITBUCKET_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI
const IS_OPENSOURCE = process.env.IS_OPENSOURCE
const SILISKY_URL = process.env.SILISKY_URL

/* This will catch route such as strove.io/app/dashboard/ */
const adress = getWindowHref()?.split('?')[0]

/* State in href allows us to control login behavior https://auth0.com/docs/protocols/oauth2/oauth-state */
/* Embeded app appends redirect link from the component level */
export default [
  {
    value: 'github',
    label: 'Github',
    href: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github,${IS_OPENSOURCE},${adress}`,
    embedHref: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github,$true,${SILISKY_URL}fromEmbed/goBackTo/`,
    icon: <Github />,
  },
  {
    value: 'bitbucket',
    label: 'Bitbucket',
    href: `https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket,${IS_OPENSOURCE},${adress}`,
    embedHref: `https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket,true,${SILISKY_URL}fromEmbed/goBackTo/`,
    icon: <Bitbucket />,
  },
  {
    value: 'gitlab',
    label: 'Gitlab',
    href: `https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=gitlab,${IS_OPENSOURCE},${adress}`,
    embedHref: `https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=gitlab,true,${SILISKY_URL}fromEmbed/goBackTo/`,
    icon: <Gitlab />,
  },
]
