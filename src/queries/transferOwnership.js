import gql from 'graphql-tag'

export default gql`
  mutation TransferOwnership($teamId: ID!, $newOwnerId: ID!) {
    transferOwnership(teamId: $teamId, newOwnerId: $newOwnerId)
  }
`
