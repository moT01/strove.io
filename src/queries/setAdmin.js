import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
  mutation SetAdmin($teamId: ID!, $newOwnerId: ID!) {
    setAdmin(teamId: $teamId, newOwnerId: $newOwnerId) {
      ...Team
    }
  }
  ${TeamFragment}
`
