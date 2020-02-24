import gql from 'graphql-tag'
import { PaymentStatusFragment } from './fragments/paymentStatus'

export default gql`
  subscription($userId: ID!) {
    paymentStatus(userId: $userId) {
      ...PaymentStatus
    }
  }
  ${PaymentStatusFragment}
`
