import gql from 'graphql-tag'

export default gql`
  mutation RemoveUserFromCollaboration($projectId: ID!, $userId: ID!) {
    removeUserFromCollaboration(projectId: $projectId, userId: $userId)
  }
`
