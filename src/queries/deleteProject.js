import gql from 'graphql-tag'

export default gql`
  mutation DeleteProject($projectId: ID!, $machineId: ID!) {
    deleteProject(projectId: $projectId, machineId: $machineId)
  }
`
