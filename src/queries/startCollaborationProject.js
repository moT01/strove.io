import gql from 'graphql-tag'

export default gql`
  mutation StartCollaborationProject($projectId: ID!, $teamId: ID!) {
    startCollaborationProject(projectId: $projectId, teamId: $teamId)
  }
`
