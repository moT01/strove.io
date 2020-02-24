import gql from 'graphql-tag'

export default gql`
  mutation AcceptTeamInvitation($teamId: ID!) {
    acceptTeamInvitation(teamId: $teamId)
  }
`
