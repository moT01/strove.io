import gql from "graphql-tag"

export default gql`
  mutation AddProject(
    $name: String!
    $description: String
    $isPrivate: Boolean
    $githubLink: String!
    $machineId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      isPrivate: $isPrivate
      githubLink: $githubLink
      machineId: $machineId
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
