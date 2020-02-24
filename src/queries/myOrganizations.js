import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  query MyOrganizations {
    myOrganizations {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
