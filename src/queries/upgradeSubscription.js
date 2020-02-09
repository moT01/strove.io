import gql from 'graphql-tag'

export default gql`
  mutation UpgradeSubscription($organizationId: ID!, $quantity: Int!) {
    upgradeSubscription(organizationId: $organizationId, quantity: $quantity)
  }
`
