import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes, css } from 'styled-components/macro'
import { isMobile } from 'react-device-detect'
import { Formik, Form, Field } from 'formik'

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
import {
  CANCEL_SUBSCRIPTION,
  MY_ORGANIZATIONS,
  UPGRADE_SUBSCRIPTION,
  RENEW_SUBSCRIPTION,
  REVERT_CANCEL,
  DOWNGRADE_SUBSCRIPTION,
} from 'queries'
import { mutation, query } from 'utils'

export const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const SectionWrapper = styled(Wrapper)`
  width: 100%;
  align-items: flex-start;
  animation: ${FadeInAnimation} 0.2s ease-out;
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

const SubscriptionsSelect = styled(StyledSelect)`
  margin: 2px;
  width: 150px;
`

const PaymentSummaryHeader = styled(Wrapper)`
  flex-direction: row;
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
  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const [organization, setOrganization] = useState({})
  const [subscriptionPlan, setSubscriptionPlan] = useState({
    value: process.env.REACT_APP_MONTHLY_PLAN,
    label: 'Monthly',
  })
  const [quantity, setQuantity] = useState(1)
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const organizationOptions = myOrganizations
    .filter(organization => organization.owner.id === user.id)
    .map(organization => ({
      value: organization,
      label: organization.name,
    }))
  const subscriptionPlans = [
    { value: process.env.REACT_APP_MONTHLY_PLAN, label: 'Monthly' },
    { value: process.env.REACT_APP_YEARLY_PLAN, label: 'Yearly' },
  ]

  const updateOrganizations = () => {
    dispatch(
      query({
        name: 'myOrganizations',
        storeKey: 'myOrganizations',
        query: MY_ORGANIZATIONS,
      })
    )
  }

  useEffect(() => {
    updateOrganizations()
    organizationOptions.length === 1 && setOrganization(organizationOptions[0])
  }, [])

  return (
    <>
      <SEO title="Dashboard" />
      <Header />
      <PageWrapper>
        <PaymentInfoColum>
          <SectionWrapper>
            <Title>1. Company info</Title>
            {organizationOptions.length === 1 ? (
              <Text>{organizationOptions[0].label}</Text>
            ) : (
              <>
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
              </>
            )}
          </SectionWrapper>
          {!!organization.value &&
            (organization.value.subscriptionStatus === 'active' ? (
              <>
                <StroveButton
                  isPrimary
                  padding="5px"
                  minWidth="150px"
                  maxWidth="150px"
                  margin="10px"
                  borderRadius="2px"
                  onClick={() =>
                    dispatch(
                      mutation({
                        name: 'cancelSubscription',
                        mutation: CANCEL_SUBSCRIPTION,
                        variables: {
                          organizationId: organization.value.id,
                        },
                        onSuccess: updateOrganizations(),
                      })
                    )
                  }
                  text="Cancel subscription"
                />
                <StroveButton
                  isPrimary
                  padding="5px"
                  minWidth="150px"
                  maxWidth="150px"
                  margin="10px"
                  borderRadius="2px"
                  onClick={() => {
                    console.log('TCL: Payments -> organization', organization)
                    dispatch(
                      mutation({
                        name: 'upgradeSubscription',
                        mutation: UPGRADE_SUBSCRIPTION,
                        variables: {
                          subscriptionId: organization.value.subscriptionId,
                          quantity,
                        },
                        onSuccess: updateOrganizations(),
                      })
                    )
                  }}
                  text="Upgrade subscription"
                />
                <StroveButton
                  isPrimary
                  padding="5px"
                  minWidth="150px"
                  maxWidth="150px"
                  margin="10px"
                  borderRadius="2px"
                  onClick={() => {
                    console.log('TCL: Payments -> organization', organization)
                    dispatch(
                      mutation({
                        name: 'downgradeSubscription',
                        mutation: DOWNGRADE_SUBSCRIPTION,
                        variables: {
                          subscriptionId: organization.value.subscriptionId,
                          quantity,
                        },
                        onSuccess: updateOrganizations(),
                      })
                    )
                  }}
                  text="downgrade subscription"
                />
              </>
            ) : organization.value.subscriptionStatus === 'canceled' ? (
              <StroveButton
                isPrimary
                padding="5px"
                minWidth="150px"
                maxWidth="150px"
                margin="10px"
                borderRadius="2px"
                onClick={() => {
                  console.log('TCL: Payments -> organization', organization)
                  dispatch(
                    mutation({
                      name: 'revertCancel',
                      mutation: REVERT_CANCEL,
                      variables: {
                        organizationId: organization.value.id,
                      },
                      onSuccess: updateOrganizations(),
                    })
                  )
                }}
                text="Revert subscription cancel"
              />
            ) : (
              //   <StroveButton
              //   isPrimary
              //   padding="5px"
              //   minWidth="150px"
              //   maxWidth="150px"
              //   margin="10px"
              //   borderRadius="2px"
              //   onClick={() =>
              //     dispatch(
              //       mutation({
              //         name: 'renewSubscription',
              //         mutation: RENEW_SUBSCRIPTION,
              //         variables: {
              //           organizationId: organization.value.id,
              //           plan: subscriptionPlan.value,
              //           quantity: quantity,
              //         },
              //         onSuccess: updateOrganizations(),
              //       })
              //     )
              //   }
              //   text="Renew subscription"
              // />
              <SectionWrapper>
                <Title>2. Payment info</Title>
                <StripeCheckoutForm
                  organization={organization.value}
                  quantity={quantity}
                  plan={subscriptionPlan.value}
                />
              </SectionWrapper>
            ))}
        </PaymentInfoColum>
        <PaymentSummarySection>
          <PaymentSummaryHeader>
            <SubscriptionsSelect
              defaultValue={'Monthly'}
              value={subscriptionPlan}
              onChange={plan => setSubscriptionPlan(plan)}
              options={subscriptionPlans}
              placeholder="Choose plan"
              styles={{
                control: styles => ({
                  ...styles,
                  backgroundColor: '#0072ce',
                  borderStyle: 'none',
                }),
                menu: styles => ({ ...styles, backgroundColor: '#0072ce' }),
                dropdownIndicator: styles => ({ styles, color: '#fff' }),
                indicatorSeparator: styles => ({ styles, color: '#fff' }),
                input: styles => ({ styles, color: '#fff' }),
                placeholder: styles => ({ styles, color: '#fff' }),
                option: styles => ({ ...styles, color: '#fff' }),
                singleValue: styles => ({ ...styles, color: '#fff' }),
              }}
            />
          </PaymentSummaryHeader>
          <Formik
            initialValues={{
              quantity: 1,
            }}
            // validate={validate}
            onSubmit={values => {
              console.log(
                'Values',
                values,
                'Subscription plan',
                subscriptionPlan
              )
              setQuantity(values.quantity)
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <Field name="quantity"></Field>
                <StroveButton
                  layout="form"
                  type="submit"
                  text="Set quantity"
                  // disabled={errors.quantity || !values.quantity}
                />
              </Form>
            )}
          </Formik>
          {subscriptionPlan && (
            <>
              <Text>Order summary</Text>
              <Text>
                {quantity} users x{' '}
                {subscriptionPlan.label === 'Yearly'
                  ? '$40 x 12 months'
                  : '$50'}{' '}
                ={' '}
                {subscriptionPlan.label === 'Yearly'
                  ? `$${quantity * 40 * 12}`
                  : `$${quantity * 50}`}
              </Text>
            </>
          )}
        </PaymentSummarySection>
      </PageWrapper>
    </>
  )
}

export default memo(Payments)
