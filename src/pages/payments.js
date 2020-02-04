import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components/macro'
import { isMobile } from 'react-device-detect'
import Select from 'react-select'
import countryList from 'react-select-country-list'

import { selectors } from 'state'
import {
  GetStarted,
  StroveButton,
  SEO,
  Header,
  Footer,
  Modal,
} from 'components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const PageWrapper = styled(Wrapper)`
  width: 100vw;
  min-height: calc(100vh - 64px);
  padding-top: 10px;
  flex-direction: row;
  align-items: flex-start;
`

const PaymentInfoColum = styled(Wrapper)`
  align-items: flex-start;
  height: 200px;
  width: 60%;
  padding: 40px;
  margin: 0px 10px 0px 20px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-width: 1px;
  border-style: solid;
`

const PaymentSummarySection = styled(Wrapper)`
  padding: 0;
  height: 200px;
  width: 40%;
  margin: 0px 20px 0px 10px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-width: 1px;
  border-style: solid;
`

const PaymentSummaryHeader = styled(Wrapper)`
  height: 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.c1};
`

const Title = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.c3};
  margin: 3px 3px 3px 0;
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin-left: 10px;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Payments = () => {
  return (
    <>
      <SEO title="Dashboard" />
      <Header />
      <PageWrapper>
        <PaymentInfoColum>
          <Title>1. Company info</Title>
        </PaymentInfoColum>
        <PaymentSummarySection>
          <PaymentSummaryHeader></PaymentSummaryHeader>
        </PaymentSummarySection>
      </PageWrapper>
    </>
  )
}

export default memo(Payments)
