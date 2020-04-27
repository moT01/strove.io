import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  subscription($userId: ID!) {
    organizationUpdate(userId: $userId) {
      organization {
        ...Organization
      }
    }
  }
  ${OrganizationFragment}
`
