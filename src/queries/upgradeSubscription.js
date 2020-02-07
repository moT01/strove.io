import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation UpgradeSubscription($subscriptionId: ID!, $quantity: Int!) {
    upgradeSubscription(subscriptionId: $subscriptionId, quantity: $quantity)
  }
`
