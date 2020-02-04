import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation TransferOrganization($organizationId: ID!, $newOwnerId: ID!) {
    transferOrganization(
      organizationId: $organizationId
      newOwnerId: $newOwnerId
    ) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
