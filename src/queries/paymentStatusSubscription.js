import gql from 'graphql-tag'
import { PaymentStatusFragment } from './fragments/paymentStatus'

export default gql`
  subscription($organizationId: ID!) {
    paymentStatus(organizationId: $organizationId) {
      ...PaymentStatus
    }
  }
  ${PaymentStatusFragment}
`
