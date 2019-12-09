import React, { memo } from 'react'
// import { Link } from 'gatsby'
import styled from 'styled-components'

const EnterpriseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c3};
  width: 100vw;
  padding: 40px 0;
`

const Footer = () => (
  <EnterpriseWrapper>
    Enterprise
  </EnterpriseWrapper>
)

export default memo(Footer)
