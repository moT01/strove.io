import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation CancelSubscription($organizationId: ID!) {
    cancelSubscription(organizationId: $organizationId) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
