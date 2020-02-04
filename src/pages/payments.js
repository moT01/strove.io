import React, { memo } from 'react'
import { selectors } from 'state'
import {
  GetStarted,
  StroveButton,
  SEO,
  Header,
  Footer,
  Modal,
} from 'components'

const Payments = () => {
  return (
    <>
      <SEO title="Dashboard" />
      <Header />
    </>
  )
}

export default memo(Payments)
