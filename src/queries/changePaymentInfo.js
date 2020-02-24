import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation ChangePaymentInfo($paymentMethod: String!, $organizationId: ID!) {
    changePaymentInfo(
      paymentMethod: $paymentMethod
      organizationId: $organizationId
    ) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
