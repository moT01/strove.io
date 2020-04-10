import gql from 'graphql-tag'

export default gql`
  mutation createGuestLink($teamId: ID!, $projectId: ID) {
    createGuestLink(teamId: $teamId, projectId: $projectId)
  }
`
