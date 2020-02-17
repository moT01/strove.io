import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation RemoveFromOrganization($organizationId: ID!, $memberId: ID!) {
    removeFromOrganization(
      organizationId: $organizationId
      memberId: $memberId
    ) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
