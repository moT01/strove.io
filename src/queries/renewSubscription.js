import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

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
