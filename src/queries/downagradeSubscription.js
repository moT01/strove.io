import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation DowngradeSubscription($subscriptionId: ID!, $quantity: Int!) {
    downgradeSubscription(subscriptionId: $subscriptionId, quantity: $quantity)
  }
`
