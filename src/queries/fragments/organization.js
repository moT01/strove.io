import gql from 'graphql-tag'
import { TeamFragment } from './team'

export const OrganizationFragment = gql`
  fragment Organization on Organization {
    id
    name
    owner
    users {
      id
      name
      email
    }
    teams {
      ...Team
    }

    paymentId
    customerId
    subscriptionId
    subscriptionStatus
    subscriptionQuantity
  }
  ${TeamFragment}
`
