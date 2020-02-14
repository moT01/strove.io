import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation RemoveMember($organizationId: ID!, $memberId: ID!) {
    removeMember(organizationId: $organizationId, memberId: $memberId) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
