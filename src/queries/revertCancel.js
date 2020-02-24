import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation ReverCancel($organizationId: ID!) {
    revertCancel(organizationId: $organizationId) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
