import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
  mutation TransferOwnership($teamId: ID!, $newOwnerId: ID!) {
    transferOwnership(teamId: $teamId, newOwnerId: $newOwnerId) {
      ...Team
    }
  }
  ${TeamFragment}
`
