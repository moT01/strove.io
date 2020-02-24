import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation CreateOrganization($name: String!) {
    createOrganization(name: $name) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
