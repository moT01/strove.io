import gql from 'graphql-tag'

export default gql`
  mutation StripeSubscribe($plan: String!, $paymentMethod: String!) {
    stripeSubscribe(plan: $plan, paymentMethod: $paymentMethod) {
      client_secret
      status
    }
  }
`
