import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation GetOrganization($organizationId: ID!) {
    getOrganization(organizationId: $organizationId) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
