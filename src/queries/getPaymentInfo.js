import gql from 'graphql-tag'

export default gql`
  query GetPaymentInfo($organizationId: ID!) {
    getPaymentInfo(organizationId: $organizationId) {
      card
      last4
    }
  }
`
