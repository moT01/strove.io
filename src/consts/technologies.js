import React from 'react'

import { theme } from 'consts'
import { Docker, Github, Google, VSCode } from 'components/svgs'

const defaultProps = {
  style: { fill: theme.colors.c14 },
  width: '100%',
  length: 'auto',
  height: '100%',
}

export default [
  {
    component: <Docker {...defaultProps} />,
    name: 'Docker',
    description:
      'Strove.io represents each environment as a Docker container built from a shared image. This lets you code in seconds, on any computer and forget that `it works on my machine` issue ever existed.',
  },
  {
    component: <VSCode {...defaultProps} />,
    name: 'VSCode',
    description:
      'Strove.io ensures the best programming experience by supporting Visual Studio Code, the most popular code editor in the world according to Stackoverflow.',
  },
  {
    component: <Google {...defaultProps} />,
    name: 'Google',
    description:
      'Code written in Strove is hosted and run in Google Cloud, ensuring consistency, security and the best performance.',
  },
  {
    component: <Github {...defaultProps} />,
    name: 'Github',
    description:
      'Github, Gitlab and Bitbucket integration provide state-of-the-art version control support allowing companies use their source control provider of choice.',
  },
]
