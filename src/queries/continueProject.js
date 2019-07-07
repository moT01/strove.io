import gql from 'graphql-tag'

export default gql`
  mutation ContinueProject($projectId: ID!) {
    continueProject(projectId: $projectId) {
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
