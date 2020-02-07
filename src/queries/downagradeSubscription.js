import gql from 'graphql-tag'

export default gql`
  mutation DowngradeSubscription($organizationId: ID!, $quantity: Int!) {
    downgradeSubscription(organizationId: $organizationId, quantity: $quantity)
  }
`
