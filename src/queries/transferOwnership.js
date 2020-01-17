import gql from 'graphql-tag'
import { ProjectFragment } from './fragments/project'

export default gql`
  mutation TransferOwnership($teamId: ID!, $newOwnerId: ID!) {
    transferOwnership(teamId: $teamId, newOwnerId: $newOwnerId){
      ...Project
    }
    ${ProjectFragment}
  }
`
