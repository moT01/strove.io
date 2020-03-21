import gql from 'graphql-tag'

export default gql`
  mutation StartCollaborationProject($projectId: ID!, $userId: ID!) {
    startCollaborationProject(projectId: $projectId, userId: $userId)
  }
`
