import gql from 'graphql-tag'

export default gql`
  mutation StopCollaborationProject($projectId: ID!) {
    stopCollaborationProject(projectId: $projectId)
  }
`
