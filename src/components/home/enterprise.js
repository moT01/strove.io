import React, { memo } from 'react'
// import { Link } from 'gatsby'
import styled from 'styled-components'

const EnterpriseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Footer = () => {
  return (
    <EnterpriseWrapper>
      Enterprise
    </EnterpriseWrapper>
  )
}

export default memo(Footer)
