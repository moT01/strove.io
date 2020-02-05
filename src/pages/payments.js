import React, { memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes, css } from 'styled-components/macro'
import { isMobile } from 'react-device-detect'
import Select from 'react-select'

import { selectors } from 'state'
import {
  GetStarted,
  StroveButton,
  SEO,
  Header,
  Footer,
  Modal,
} from 'components'
import { StyledSelect } from 'pages/dashboard/styled'
import StripeCheckoutForm from 'components/stripeCheckoutForm'

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
  const user = useSelector(selectors.api.getUser)
  const [organization, setOrganization] = useState({})
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const organizationOptions = myOrganizations
    .filter(organization => organization.owner.id === user.id)
    .map(organization => ({
      value: organization,
      label: organization.name,
    }))

  return (
    <>
      <SEO title="Dashboard" />
      <Header />
      <PageWrapper>
        <PaymentInfoColum>
          <Title>1. Company info</Title>
          <StyledSelect
            value={organization}
            onChange={organization => setOrganization(organization)}
            options={organizationOptions}
            theme={theme => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: '#0072ce',
                neutral5: '#0072ce',
                neutral10: '#0072ce',
                neutral20: '#0072ce',
                neutral30: '#0072ce',
                neutral40: '#0072ce',
                neutral50: '#0072ce',
                neutral60: '#0072ce',
                neutral70: '#0072ce',
                neutral80: '#0072ce',
                neutral90: '#0072ce',
              },
            })}
          />
          <Title>2. Card info</Title>
          <StripeCheckoutForm />
        </PaymentInfoColum>
        <PaymentSummarySection>
          <PaymentSummaryHeader></PaymentSummaryHeader>
        </PaymentSummarySection>
      </PageWrapper>
    </>
  )
}

export default memo(Payments)
