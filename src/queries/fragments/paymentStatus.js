import gql from 'graphql-tag'

export const PaymentStatusFragment = gql`
  fragment PaymentStatus on PaymentStatus {
    status
    organizationId
    type
  }
`
