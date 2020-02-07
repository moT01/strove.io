import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation UpgradeSubscription($organizationId: ID!, $quantity: Int!) {
    upgradeSubscription(organizationId: $organizationId, quantity: $quantity)
  }
`
