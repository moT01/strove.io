import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
  mutation SetAdmin($teamId: ID!, $newTeamLeaderId: ID!) {
    setAdmin(teamId: $teamId, newTeamLeaderId: $newTeamLeaderId) {
      ...Team
    }
  }
  ${TeamFragment}
`
