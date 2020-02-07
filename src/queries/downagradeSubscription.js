import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation DowngradeSubscription($organizationId: ID!, $quantity: Int!) {
    downgradeSubscription(organizationId: $organizationId, quantity: $quantity)
  }
`
