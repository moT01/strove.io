import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
  mutation AddMember($memberEmails: [String!], $teamId: ID!) {
    addMember(memberEmails: $memberEmails, teamId: $teamId) {
      ...Team
    }
  }
  ${TeamFragment}
`
