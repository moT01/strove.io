import gql from 'graphql-tag'

export default gql`
  query GetProjects {
    projects(limit: 10) {
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
