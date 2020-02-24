import gql from 'graphql-tag'

export default gql`
  mutation LeaveTeam($teamId: ID!) {
    leaveTeam(teamId: $teamId)
  }
`
