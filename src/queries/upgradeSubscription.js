import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation UpgradeSubscription($organizationId: ID!) {
    upgradeSubscription(organizationId: $organizationId) {
      ...Organization
    }
  }
  ${OrganizationFragment}
`
