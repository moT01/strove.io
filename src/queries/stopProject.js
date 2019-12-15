import gql from 'graphql-tag'

export default gql`
  mutation StopProject($projectId: ID!) {
    stopProject(projectId: $projectId)
  }
`
