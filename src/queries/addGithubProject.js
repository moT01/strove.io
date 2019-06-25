import gql from 'graphql-tag'

export default gql`
  mutation AddProject(
    $name: String!
    $description: String
    $isPrivate: Boolean
    $githubLink: String!
  ) {
    addProject(
      name: $name
      description: $description
      isPrivate: $isPrivate
      githubLink: $githubLink
    ) {
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
