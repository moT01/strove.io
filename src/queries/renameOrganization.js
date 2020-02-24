import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation RenameOrganiozation($organizationId: ID!, $newName: String!) {
    renameOrganization(organizationId: $organizationId, newName: $newName) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
