import gql from 'graphql-tag'

export default gql`
  mutation AddUserToCollaboration($projectId: ID!, $userId: ID!) {
    addUserToCollaboration(projectId: $projectId, userId: $userId)
  }
`
