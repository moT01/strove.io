import React, { useState } from 'react'
import { CardElement, injectStripe, Elements } from 'react-stripe-elements'
import { useSelector, useDispatch } from 'react-redux'
import { selectors } from 'state'
import { mutation } from 'utils'
import {
  STRIPE_SUBSCRIBE,
  STRIPE_CLIENT_SECRET,
  CHANGE_PAYMENT_INFO,
} from 'queries'

const CheckoutForm = props => {
  const [cardElement, setCardElement] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const user = useSelector(selectors.api.getUser)
  const dispatch = useDispatch()

  console.log(props.stripe)

  // This starts the flow for paymentInfo change or adding new paymentInfo without interacting with subscription
  const getSecret = async () => {
    dispatch(
      mutation({
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
          card: cardElement,
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
              // organizationId: ...
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
      card: cardElement,
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
          plan: 'plan_GYjzUWz4PmzdMg',
        },
        dataSelector: data => data.stripeSubscribe,
        onSuccess: data => handleResponse(data),
      })
    )
  }

  // Function continuing flow from function above
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

  const handleReady = element => {
    setCardElement(element)
  }

  // Needs improvemnts look-wise, good luck Matthew :)
  return (
    <div>
      {user?.email && !success && (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement onReady={handleReady} />
          <button onClick={submit}>Purchase</button>
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

export default () => (
  <Elements>
    <FormWithStripe />
  </Elements>
)
