import gql from 'graphql-tag'
import { TeamFragment } from './team'

export const OrganizationFragment = gql`
  fragment Organization on Organization {
    id
    name
    owner {
      id
      name
      email
    }
    users {
      id
      name
      email
    }
    guests {
      id
      name
    }
    teams {
      ...Team
    }

    paymentId
    customerId
    subscriptionId
    subscriptionStatus
    subscriptionQuantity
    subscriptionPlan
  }
  ${TeamFragment}
`
