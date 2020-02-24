import gql from 'graphql-tag'

export default gql`
  mutation StripeSubscribe(
    $plan: String!
    $paymentMethod: String!
    $name: String!
    $organizationId: ID!
    $email: String!
    $quantity: Int
  ) {
    stripeSubscribe(
      plan: $plan
      paymentMethod: $paymentMethod
      name: $name
      organizationId: $organizationId
      email: $email
      quantity: $quantity
    ) {
      client_secret
      status
    }
  }
`
