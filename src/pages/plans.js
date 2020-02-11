import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes, css } from 'styled-components/macro'
import PaymentIcon from 'react-payment-icons'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'
import { StroveButton, SEO, Header, Modal } from 'components'
import { StyledSelect } from 'pages/dashboard/styled'
import StripeCheckoutForm from 'components/stripeCheckoutForm'
import {
  CANCEL_SUBSCRIPTION,
  MY_ORGANIZATIONS,
  REVERT_CANCEL,
  CHANGE_PLAN,
  GET_PAYMENT_INFO,
  RENEW_SUBSCRIPTION,
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
`

const SectionWrapper = styled(Wrapper)`
  width: 100%;
  align-items: flex-start;
  animation: ${FadeInAnimation} 0.2s ease-out;
  margin-bottom: 30px;
`

const PageWrapper = styled(Wrapper)`
  min-height: calc(100vh - 64px);
  flex-direction: row;
  width: 100vw;
  padding: 0 40px;
  max-width: 1000px;
`

const PaymentInfoColumn = styled(Wrapper)`
  align-items: flex-start;
  margin: 0px 10px 0px 20px;
  max-width: 800px;
  margin-top: 100px;
  /* border: 1px solid ${({ theme }) => theme.colors.c15};
  box-shadow: 0 1px 5px ${({ theme }) => theme.colors.c22}; */
`

const PaymentSummaryWrapper = styled(Wrapper)`
  position: relative;
  width: 100%;
  align-items: flex-end;
`

const PaymentSummarySection = styled(Wrapper)`
  align-items: flex-start;
  top: 100px;
  position: absolute;
  padding: 0;
  width: 100%;
  max-width: 400px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.c15};
  box-shadow: 0 1px 5px ${({ theme }) => theme.colors.c22}; */
`

const SubscriptionsSelect = styled(StyledSelect)`
  margin: 2px;
  width: 150px;
`

const PaymentSummaryHeader = styled(Wrapper)`
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.c1};
  border: 1px solid ${({ theme }) => theme.colors.c1};
  border-radius: 0;
  padding: 20px;
`

const PaymentSummaryInfo = styled(Wrapper)`
  height: 100%;
  width: 100%;
  align-items: flex-start;
  padding: 20px;
`

const Title = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.c3};
  margin: 0 0 30px;
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

const TextWithBorder = styled(Text)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.c22};
  width: 100%;
  padding-bottom: 15px;
  margin-bottom: 15px;
  justify-content: space-between;
`

const ModalText = styled(Text)`
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
  word-break: break-word;
`

const OrderPriceSum = styled(TextWithBorder)`
  border: none;
`

const BoldText = styled(Text)`
  font-weight: 600;
  margin-left: 5px;
`

const WhiteText = styled(Text)`
  color: ${({ theme }) => theme.colors.c2};
`

const ModalButton = styled(StroveButton)`
  animation: ${FadeInAnimation} 0.2s ease-out;
  border-radius: 2px;
  max-width: 150px;
  padding: 5px;
`

const OrganizationSelect = styled(StyledSelect)`
  width: 350px;
`

const optionColor = 'rgba(185,185,185,0.65)'

const subscriptionPlans = [
  {
    value: process.env.REACT_APP_MONTHLY_PLAN,
    monthsCount: 1,
    label: 'Monthly',
    monthlyPrice: '50',
    monthsLabel: '1 month',
  },
  {
    value: process.env.REACT_APP_YEARLY_PLAN,
    monthsCount: 12,
    label: 'Yearly',
    monthlyPrice: '40',
    monthsLabel: '12 months',
  },
]

const emptyWarningModalContent = {
  visible: false,
  content: null,
  onSubmit: null,
  buttonLabel: '',
}

const Plans = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const [editMode, setEditMode] = useState()
  const [organization, setOrganization] = useState({})
  const [paymentInfo, setPaymentInfo] = useState()
  const [warningModal, setWarningModal] = useState(emptyWarningModalContent)
  const [subscriptionPlan, setSubscriptionPlan] = useState(subscriptionPlans[0])
  const [quantity, setQuantity] = useState(organization?.team?.length || 1)
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const organizationOptions = myOrganizations
    .filter(organization => organization.owner.id === user.id)
    .map(organization => ({
      value: organization,
      label: organization.name,
    }))

  const closeWarningModal = () => {
    setWarningModal(emptyWarningModalContent)
  }

  const updateOrganizations = () => {
    dispatch(
      query({
        name: 'myOrganizations',
        storeKey: 'myOrganizations',
        query: MY_ORGANIZATIONS,
      })
    )
  }

  const fetchPaymentInfo = organization => {
    organization?.value &&
      dispatch(
        query({
          name: 'getPaymentInfo',
          storeKey: 'getPaymentInfo',
          query: GET_PAYMENT_INFO,
          variables: {
            organizationId: organization.value.id,
          },
          onSuccess: data => {
            setPaymentInfo(data)
          },
        })
      )
  }
  useEffect(() => {
    updateOrganizations()
    organizationOptions.length === 1 && setOrganization(organizationOptions[0])
  }, [])

  useEffect(() => {
    fetchPaymentInfo(organization)
    setQuantity(organization.value?.users?.length)
  }, [organization?.value])

  return (
    <>
      <SEO title="Plans" />
      <Header />
      <PageWrapper>
        <PaymentInfoColumn>
          <SectionWrapper>
            <Title>1. Company information</Title>
            {organizationOptions.length === 1 ? (
              <Text>
                Organization name:
                <BoldText>{organizationOptions[0].label}</BoldText>
              </Text>
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
          {/* May be added in the futuer. Displaying company address and such
          {!!organization.value && (
            <SectionWrapper>
              <CompanyInfoWrapper>
                <Text>Here goes your company info</Text>
              </CompanyInfoWrapper>
            </SectionWrapper>
          )} */}
          {!!organization.value &&
            (organization.value.subscriptionStatus === 'active' ? (
              <>
                <Title>2. Payment information</Title>
                <Text>Your current credit card:</Text>
                <Text>
                  {paymentInfo && (
                    <PaymentIcon
                      id={paymentInfo.card}
                      style={{ height: '1rem', margin: ' 0px 10px 0px 0px' }}
                    />
                  )}
                  **** **** **** {paymentInfo?.last4}
                </Text>
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
                {/* <StroveButton
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
                          organizationId: organization.value.id,
                          quantity: 560,
                        },
                        onSuccess: updateOrganizations(),
                      })
                    )
                  }}
                  text="Upgrade subscription"
                /> */}
                <StroveButton
                  isPrimary
                  padding="5px"
                  minWidth="150px"
                  maxWidth="150px"
                  margin="10px"
                  borderRadius="2px"
                  onClick={() => {
                    setEditMode(true)
                  }}
                  text="Edit payment info"
                />
                {editMode && (
                  <StripeCheckoutForm
                    organization={organization.value}
                    quantity={quantity}
                    plan={subscriptionPlan.value}
                    editMode={editMode}
                    setEditMode={setEditMode}
                  />
                )}
              </>
            ) : organization.value.subscriptionStatus === 'canceled' ? (
              <>
                <Title>2. Subscription information</Title>
                <Text>Subscription status: canceled</Text>
                <StroveButton
                  isPrimary
                  padding="5px"
                  minWidth="150px"
                  maxWidth="300px"
                  margin="10px"
                  borderRadius="2px"
                  onClick={() => {
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
              </>
            ) : organization.value.subscriptionStatus === 'inactive' ? (
              <>
                <Title>2. Payment information</Title>
                <Text>Your subscription has ended.</Text>
                <Text>
                  You can renew the subscription with your previous card.
                </Text>
                <Text>
                  {paymentInfo && (
                    <PaymentIcon
                      id={paymentInfo.card}
                      style={{ height: '1rem', margin: ' 0px 10px 0px 0px' }}
                    />
                  )}
                  **** **** **** {paymentInfo?.last4}
                </Text>
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
                        name: 'renewSubscription',
                        mutation: RENEW_SUBSCRIPTION,
                        variables: {
                          organizationId: organization.value.id,
                          plan: subscriptionPlan.value,
                          quantity: quantity,
                        },
                        onSuccess: updateOrganizations(),
                      })
                    )
                  }
                  text="Renew subscription"
                />
              </>
            ) : (
              <SectionWrapper>
                <Title>2. Payment method</Title>
                <StripeCheckoutForm
                  organization={organization.value}
                  quantity={quantity}
                  plan={subscriptionPlan.value}
                  editMode={editMode}
                />
              </SectionWrapper>
            ))}
        </PaymentInfoColumn>
        <PaymentSummaryWrapper>
          <PaymentSummarySection>
            <PaymentSummaryHeader>
              <WhiteText>
                <b>Strove subscription</b>
              </WhiteText>
              {organization.value?.subscriptionStatus === 'active' ? (
                <WhiteText>Current plan: {subscriptionPlan.label}</WhiteText>
              ) : (
                <SubscriptionsSelect
                  defaultValue="Monthly"
                  value={subscriptionPlan}
                  onChange={plan => setSubscriptionPlan(plan)}
                  options={subscriptionPlans}
                  placeholder="Choose plan"
                  styles={{
                    control: styles => ({
                      ...styles,
                      backgroundColor: '#0072ce',
                      borderStyle: 'none',
                      boxShadow: 'none',
                    }),
                    menu: styles => ({ ...styles, backgroundColor: '#0072ce' }),
                    dropdownIndicator: styles => ({ styles, color: '#fff' }),
                    indicatorSeparator: styles => ({ styles, color: '#fff' }),
                    input: styles => ({ styles, color: '#fff' }),
                    placeholder: styles => ({ styles, color: '#fff' }),
                    option: styles => ({
                      ...styles,
                      color: '#fff',
                      backgroundColor: '#0072ce',
                      '&:hover': {
                        backgroundColor: '#0099de',
                      },
                      '&:active': {
                        backgroundColor: '#0072ce',
                      },
                    }),
                    singleValue: styles => ({
                      ...styles,
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#0072ce',
                      },
                      '&:active': {
                        backgroundColor: '#0072ce',
                      },
                    }),
                  }}
                />
              )}
            </PaymentSummaryHeader>
            {/* <Formik
            initialValues={{
              quantity: organization.users.length,
            }}
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
          </Formik> */}
            <PaymentSummaryInfo>
              {subscriptionPlan && (
                <>
                  <TextWithBorder>
                    <b>Order summary</b>
                  </TextWithBorder>
                  <TextWithBorder>
                    Members <BoldText>{quantity}</BoldText>
                  </TextWithBorder>
                  <TextWithBorder>
                    Single member price{' '}
                    <BoldText>${subscriptionPlan.monthlyPrice}</BoldText>
                  </TextWithBorder>
                  <TextWithBorder>
                    Number of months{' '}
                    <BoldText>{subscriptionPlan.monthsCount}</BoldText>
                  </TextWithBorder>
                  <OrderPriceSum>
                    ${subscriptionPlan.monthlyPrice} x {quantity} users x{' '}
                    {subscriptionPlan.monthsLabel}
                    <BoldText>
                      $
                      {quantity *
                        subscriptionPlan.monthlyPrice *
                        subscriptionPlan.monthsCount}
                    </BoldText>
                  </OrderPriceSum>
                </>
              )}
              {organization.value?.subscriptionStatus === 'active' && (
                <StroveButton
                  isPrimary
                  padding="5px"
                  minWidth="150px"
                  maxWidth="300px"
                  margin="10px"
                  borderRadius="2px"
                  onClick={() => {
                    setWarningModal({
                      visible: true,
                      content: (
                        <ModalText>
                          Are you sure you want to upgrade your subscription to
                          yearly plan?
                        </ModalText>
                      ),
                      buttonLabel: 'Upgrade',
                      onSubmit: () => {
                        dispatch(
                          mutation({
                            name: 'changePlan',
                            mutation: CHANGE_PLAN,
                            variables: {
                              organizationId: organization.value.id,
                              newPlan: 'plan_GYjzUWz4PmzdMg',
                            },
                            onSuccess: () => updateOrganizations(),
                          })
                        )
                      },
                    })
                  }}
                  text="Upgrade to yearly plan"
                />
              )}
            </PaymentSummaryInfo>
          </PaymentSummarySection>
        </PaymentSummaryWrapper>
      </PageWrapper>
      <Modal
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
        height={isMobileOnly ? '30vh' : '20vh'}
        isOpen={warningModal.visible}
        onRequestClose={() => setWarningModal(emptyWarningModalContent)}
        contentLabel="Warning"
        ariaHideApp={false}
      >
        {warningModal.content}
        {warningModal.buttonLabel && (
          <ModalButton
            isPrimary
            onClick={warningModal.onSubmit}
            text={warningModal.buttonLabel}
            padding="5px"
            maxWidth="150px"
          />
        )}
        <ModalButton
          onClick={closeWarningModal}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>
    </>
  )
}

export default memo(Plans)
