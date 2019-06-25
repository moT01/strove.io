import gql from 'graphql-tag'

export default gql`
  {
    myProjects {
      edges {
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
  }
`
