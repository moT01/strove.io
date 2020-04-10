import gql from 'graphql-tag'

export default gql`
  mutation RemoveGuest($teamId: ID!, $memberId: ID!) {
    RemoveGuest(teamId: $teamId, memberId: $memberId)
  }
`
