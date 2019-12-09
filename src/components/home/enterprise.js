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

const EnterpriseFeatures = styled.ul`
  background-color: ${({ theme }) => theme.colors.c3};
  padding: 20px;
  list-style: none;
  min-width: 320px;
  text-align: left;
  font-size: 20px;
  li:before {
    margin-right: 0.3em;
    content: '✔';
    color: ${({ theme }) => theme.colors.c1};
  }
`

const Footer = () => (
  <EnterpriseWrapper>
    <EnterpriseFeatures>
      <li>No need to buy computers</li>
      <li>Less bureaucracy</li>
      <li>Less money spent</li>
      <li>More code</li>
      <li>Powerful servers</li>
    </EnterpriseFeatures>
    Enterprise
  </EnterpriseWrapper>
)

export default memo(Footer)
