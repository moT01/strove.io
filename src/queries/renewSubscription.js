import gql from 'graphql-tag'

export default gql`
  mutation RenewSubscription(
    $organizationId: ID!
    $plan: String!
    $quantity: Int
  ) {
    renewSubscription(
      organizationId: $organizationId
      plan: $plan
      quantity: $quantity
    ) {
      client_secret
      status
    }
  }
`
