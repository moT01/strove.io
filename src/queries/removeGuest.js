import gql from 'graphql-tag'

export default gql`
  mutation RemoveGuest($teamId: ID!, $memberId: ID!) {
    removeGuest(teamId: $teamId, memberId: $memberId)
  }
`
