import gql from 'graphql-tag'

export default gql`
  mutation DeleteGuestLink($teamId: ID!) {
    DeleteGuestLink(teamId: $teamId)
  }
`
