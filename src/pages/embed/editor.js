import React, { memo } from 'react'

import {Editor} from 'components'

const EmbeddedEditor = () => {
  return <Editor />
}

export default memo(() => <EmbeddedEditor />)
