import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components/macro'
import {
  injectStripe,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements'
import { useSelector, useDispatch } from 'react-redux'

import { mutation, query } from 'utils'
import {
  STRIPE_SUBSCRIBE,
  STRIPE_CLIENT_SECRET,
  CHANGE_PAYMENT_INFO,
  RETRY_SUBSCRIPTION_PAYMENT,
} from 'queries'
import StroveButton from 'components/stroveButton.js'
import { selectors } from 'state'

const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const StripeCvcWrapper = styled(CardInfoWrapper)`
  width: 50%;
`

const StripeExpiryWrapper = styled(CardInfoWrapper)`
  width: 30%;
`

const StripeElementContainer = styled.div`
  width: 100%;
  margin: 10px 0px;
  padding: 8px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.c9};
`

const StripeCvcContainer = styled(StripeElementContainer)`
  width: 100%;
`

const StripeExpiryContainer = styled(StripeElementContainer)`
  width: 100%;
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 16px;
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 600;
`

const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const SingleButtonWrapper = styled(VerticalDivider)`
  justify-content: center;
`

const cardStyle = {
  base: {
    height: '200px',
    iconColor: '#c4f0ff',
    color: '##0072ce',
    fontWeight: 500,
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#0072ce',
    },
    '::placeholder': {
      color: 'rgba(185,185,185,0.65)',
    },
    '.inputContainer': {
      border: '5px solid red',
    },
  },
  invalid: {
    iconColor: 'red',
    color: 'red',
  },
}

const emptyWarningModalContent = {
  visible: false,
  content: null,
  onSubmit: null,
  buttonLabel: '',
}

const CheckoutForm = props => {
  const [cardNumber, setCardNumber] = useState()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const user = useSelector(selectors.api.getUser)
  const dispatch = useDispatch()
  const organizationId = props.organization?.id

  useEffect(() => {
    const { setWarningModal } = props
    !!error &&
      setWarningModal({
        visible: true,
        content: <Text>{error.message}</Text>,
        onSubmit: () => {
          setIsProcessing(false)
          setError(false)
          setWarningModal(emptyWarningModalContent)
        },
        buttonLabel: 'Ok',
        noClose: true,
      })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [error])

  useEffect(() => {
    success &&
      props.setWarningModal({
        visible: true,
        content: (
          <Text>Your credit card information change has succeeded.</Text>
        ),
        onSubmit: () => {
          setIsProcessing(false)
          setSuccess(false)
          props.setWarningModal(emptyWarningModalContent)
        },
        buttonLabel: 'Ok',
        noClose: true,
      })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [success])

  // This starts the flow for paymentInfo change or adding new paymentInfo without interacting with subscription
  const getSecret = async () => {
    setIsProcessing(true)
    dispatch(
      query({
        name: 'clientSecret',
        query: STRIPE_CLIENT_SECRET,
        dataSelector: data => data.getClientSecret,
        onSuccess: data => changePaymentInfo(data),
      })
    )
  }

  // This continues the flow of previous function
  const changePaymentInfo = async clientSecret => {
    const { setupIntent, error } = await props.stripe.confirmCardSetup(
      clientSecret,
      {
        payment_method: {
          card: cardNumber,
          billing_details: {
            email: user.email,
          },
        },
      }
    )

    if (error) {
      setError(error)
    } else {
      if (setupIntent.status === 'succeeded') {
        dispatch(
          mutation({
            name: 'changePaymentInfo',
            mutation: CHANGE_PAYMENT_INFO,
            variables: {
              paymentMethod: setupIntent.payment_method,
              organizationId,
            },
            dataSelector: data => data.changePaymentInfo,
            onSuccess: () => {
              setIsProcessing(false)
              props.setEditMode(false)
            },
          })
        )
      }
    }
  }

  const submit = async event => {
    const { paymentMethod, error } = await props.stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
      billing_details: {
        email: user.email,
      },
    })

    if (error) {
      setError(error)
    }

    if (!paymentMethod) {
      setError('No payment method')
    }

    dispatch(
      mutation({
        name: 'stripeSubscribe',
        mutation: STRIPE_SUBSCRIBE,
        variables: {
          paymentMethod: paymentMethod?.id,
          plan: props.plan,
          name: user.name,
          email: user.email,
          organizationId,
        },
        onSuccess: data => handleResponse(data),
      })
    )
  }

  // Function continuing flow from function above, also use it for renewSubscription - probably not necessary but do it just in case
  const handleResponse = async response => {
    const { client_secret, status } = response

    if (status === 'requires_action') {
      props.stripe.confirmCardPayment(client_secret).then(function(result) {
        if (result.error) {
          console.log('Error on confirmCardPayment', result.error)
          setError(error)
        } else {
          // Additional confirmation was successful
          setSuccess(true)
        }
      })
    } else {
      setSuccess(true)
    }
  }

  // Necessary to load up data from card Element
  const handleReady = element => {
    setCardNumber(element)
  }

  // Needs improvemnts look-wise, good luck Matthew :)
  return (
    <div style={{ width: '350px' }}>
      {user?.email && !success && (
        <div className="checkout">
          <CardInfoWrapper>
            <Text>Card number</Text>
            <StripeElementContainer>
              <CardNumberElement style={cardStyle} onReady={handleReady} />
            </StripeElementContainer>
            <VerticalDivider>
              <StripeCvcWrapper>
                <Text>Expiry date</Text>
                <StripeExpiryContainer>
                  <CardExpiryElement style={cardStyle} />
                </StripeExpiryContainer>
              </StripeCvcWrapper>
              <StripeExpiryWrapper>
                <Text>CVC</Text>
                <StripeCvcContainer>
                  <CardCVCElement style={cardStyle} />
                </StripeCvcContainer>
              </StripeExpiryWrapper>
            </VerticalDivider>
            {props.editMode ? (
              <CardInfoWrapper>
                <VerticalDivider>
                  <StroveButton
                    isPrimary
                    isDisabled={!organizationId}
                    isProcessing={isProcessing}
                    padding="5px"
                    minWidth="150px"
                    maxWidth="150px"
                    margin="20px 10px"
                    borderRadius="2px"
                    onClick={getSecret}
                    text="Save"
                  />
                  <StroveButton
                    isDisabled={!organizationId}
                    isProcessing={isProcessing}
                    padding="5px"
                    minWidth="150px"
                    maxWidth="150px"
                    margin="20px 10px"
                    borderRadius="2px"
                    onClick={() => props.setEditMode(false)}
                    text="Cancel"
                  />
                </VerticalDivider>

                {!!error && (
                  <SingleButtonWrapper>
                    <StroveButton
                      isPrimary
                      isDisabled={!organizationId}
                      isProcessing={isProcessing}
                      padding="5px"
                      minWidth="150px"
                      maxWidth="150px"
                      margin="10px"
                      borderRadius="2px"
                      onClick={() =>
                        dispatch(
                          mutation({
                            name: 'retrySubscriptionPayment',
                            mutation: RETRY_SUBSCRIPTION_PAYMENT,
                            variable: { organizationId: organizationId },
                          })
                        )
                      }
                      text="Retry payment"
                    />
                  </SingleButtonWrapper>
                )}
              </CardInfoWrapper>
            ) : (
              <StroveButton
                isPrimary
                isDisabled={!organizationId}
                isProcessing={isProcessing}
                fontSize="18px"
                padding="5px"
                minWidth="250px"
                maxWidth="250px"
                margin="30px 0"
                borderRadius="2px"
                onClick={submit}
                text="Purchase"
              />
            )}
          </CardInfoWrapper>
        </div>
      )}
    </div>
  )
}

const FormWithStripe = injectStripe(CheckoutForm)

export default memo(
  ({
    organization,
    quantity,
    plan,
    editMode,
    setEditMode,
    setWarningModal,
  }) => (
    <Elements>
      <FormWithStripe
        organization={organization}
        quantity={quantity}
        plan={plan}
        editMode={editMode}
        setEditMode={setEditMode}
        setWarningModal={setWarningModal}
      />
    </Elements>
  )
)
