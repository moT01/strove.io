import React, { useState } from 'react'
import styled from 'styled-components/macro'
import {
  injectStripe,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import isEmail from 'validator/lib/isEmail'

import { selectors } from 'state'
import { mutation, query } from 'utils'
import {
  STRIPE_SUBSCRIBE,
  STRIPE_CLIENT_SECRET,
  CHANGE_PAYMENT_INFO,
} from 'queries'
import StroveButton from 'components/stroveButton.js'

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

const EmailForm = styled(Form)`
  width: 100%;
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

const EmailField = styled(Field)`
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.c9};
`

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const CheckoutForm = props => {
  const [cardNumber, setCardNumber] = useState()
  const [userEmail, setUserEmail] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const user = useSelector(selectors.api.getUser)
  const dispatch = useDispatch()
  const organizationId = props.organization?.id

  // This starts the flow for paymentInfo change or adding new paymentInfo without interacting with subscription
  const getSecret = async () => {
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
      // Display error.message in your UI.
    } else {
      if (setupIntent.status === 'succeeded') {
        // The setup has succeeded. Display a success message. Send
        // setupIntent.payment_method to your server to save the card to a Customer
        // !!! Add organizationId to mutation dispatch below !!!
        dispatch(
          mutation({
            name: 'changePaymentInfo',
            mutation: CHANGE_PAYMENT_INFO,
            variables: {
              paymentMethod: setupIntent.payment_method,
              organizationId,
            },
            dataSelector: data => data.changePaymentInfo,
            onSuccess: data => console.log(data),
          })
        )
      }
    }
  }

  // This starts the flow for getting new subscription
  const submit = async event => {
    const { paymentMethod, error } = await props.stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
      billing_details: {
        email: user.email,
      },
    })

    if (error) {
      setError(true)
      return console.log('Error happened on paymentMethod creation!', error)
    }

    dispatch(
      mutation({
        name: 'stripeSubscription',
        mutation: STRIPE_SUBSCRIBE,
        variables: {
          paymentMethod: paymentMethod.id,
          plan: props.plan,
          name: user.name,
          email: 'mateusz@strove.io',
          organizationId,
        },
        dataSelector: data => data.stripeSubscribe,
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
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc)
          console.log('Error on confirmCardPayment', result.error)
          setError(true)
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

            <Text>Work email (optional)</Text>
            <Formik
              initialValues={{
                email: user.email,
              }}
              validate={validate}
            >
              <>
                <EmailForm>
                  <EmailField
                    type="email"
                    name="email"
                    placeholder="Your Email"
                  ></EmailField>
                </EmailForm>
                {props.editMode ? (
                  <VerticalDivider>
                    <StroveButton
                      isPrimary
                      isDisabled={!organizationId}
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
                      padding="5px"
                      minWidth="150px"
                      maxWidth="150px"
                      margin="20px 10px"
                      borderRadius="2px"
                      onClick={() => props.setEditMode(false)}
                      text="Cancel"
                    />
                  </VerticalDivider>
                ) : (
                  <StroveButton
                    isPrimary
                    isDisabled={!organizationId}
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
              </>
            </Formik>
          </CardInfoWrapper>
        </div>
      )}
      {error && (
        <div>
          <p>Could not process card data!</p>
        </div>
      )}
      {success && (
        <div>
          <p>Subscribed successfully</p>
        </div>
      )}
    </div>
  )
}

const FormWithStripe = injectStripe(CheckoutForm)

export default ({ organization, quantity, plan, editMode, setEditMode }) => (
  <Elements>
    <FormWithStripe
      organization={organization}
      quantity={quantity}
      plan={plan}
      editMode={editMode}
      setEditMode={setEditMode}
    />
  </Elements>
)
