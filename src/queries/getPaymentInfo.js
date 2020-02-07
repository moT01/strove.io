import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  query GetPaymentInfo($organizationId: ID!) {
    getPaymentInfo(organizationId: $organizationId) {
      card
      last4
    }
  }
`
