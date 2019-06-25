import gql from 'graphql-tag'

export default gql`
  {
    myProjects {
      edges {
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
  }
`
