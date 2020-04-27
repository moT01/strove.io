import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  subscription($userId: ID!) {
    organizationUpdate(userdId: $userId) {
      ...organization
    }
  }
  ${OrganizationFragment}
`
