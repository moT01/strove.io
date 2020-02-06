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
  width: 80%;
  min-height: calc(100vh - 64px);
  padding-top: 50px;
  flex-direction: row;
  align-items: flex-start;
`

const PaymentInfoColum = styled(Wrapper)`
  align-items: flex-start;
  width: 60%;
  padding: 0px 40px;
  margin: 0px 10px 0px 20px;
  /* border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-width: 1px;
  border-style: solid; */
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
  margin: 30px 0px;
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const OrganizationSelect = styled(StyledSelect)`
  width: 350px;
`

const optionColor = 'rgba(185,185,185,0.65)'

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
  console.log(
    'TCL: Payments -> organizationOptions',
    organizationOptions,
    organization
  )

  return (
    <>
      <SEO title="Dashboard" />
      <Header />
      <PageWrapper>
        <PaymentInfoColum>
          <Title>1. Company info</Title>
          <Text>Choose organization</Text>
          <OrganizationSelect
            value={organization}
            onChange={organization => setOrganization(organization)}
            options={organizationOptions}
            theme={theme => ({
              ...theme,
              borderRadius: '2px',
              colors: {
                ...theme.colors,
                primary: optionColor,
                neutral5: optionColor,
                neutral10: optionColor,
                neutral20: optionColor,
                neutral30: optionColor,
                neutral40: optionColor,
                neutral50: optionColor,
                neutral60: '#0072ce',
                neutral70: optionColor,
                neutral80: '#0072ce',
                neutral90: optionColor,
              },
            })}
          />
          <Title>2. Card info</Title>
          <StripeCheckoutForm organization={organization.value} />
        </PaymentInfoColum>
        <PaymentSummarySection>
          <PaymentSummaryHeader></PaymentSummaryHeader>
        </PaymentSummarySection>
      </PageWrapper>
    </>
  )
}

export default memo(Payments)
