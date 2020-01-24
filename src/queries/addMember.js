import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
  mutation AddMember($memberEmail: String!, $teamId: ID!) {
    addMember(memberEmail: $memberEmail, teamId: $teamId) {
      ...Team
    }
  }
  ${TeamFragment}
`
