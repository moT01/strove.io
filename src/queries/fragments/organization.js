import gql from 'graphql-tag'
import { UserFragment } from './user'
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
  }
  ${TeamFragment}
`
