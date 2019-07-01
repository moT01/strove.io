import gql from 'graphql-tag'

export default gql`
  mutation StopProject($projectId: ID!, $machineId: ID!) {
    stopProject(projectId: $projectId, machineId: $machineId)
  }
`
