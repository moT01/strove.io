import gql from 'graphql-tag'

export default gql`
  mutation AddProject(
    $name: String!
    $description: String
    $isPrivate: Boolean
    $repoLink: String!
    $teamId: ID!
    $forkedFromId: ID
  ) {
    addProject(
      name: $name
      description: $description
      isPrivate: $isPrivate
      repoLink: $repoLink
      teamId: $teamId
      forkedFromId: $forkedFromId
    )
  }
`
