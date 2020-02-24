import gql from 'graphql-tag'

export default gql`
  mutation RetrySubscriptionPayment($organizationId: ID!) {
    retrySubscriptionPayment(organizationId: $organizationId)
  }
`
