import gql from 'graphql-tag'

export default gql`
  mutation ContinueProject($projectId: ID!, $machineId: ID!) {
    continueProject(projectId: $projectId, machineId: $machineId) {
      id
      name
      description
      isPrivate
      createdAt
      githubLink
      machineId
      editorPort
      previewPort
    }
  }
`
