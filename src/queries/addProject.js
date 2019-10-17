import gql from 'graphql-tag'
import { ProjectFragment } from './fragments/project'

export default gql`
  mutation AddProject(
    $name: String!
    $description: String
    $isPrivate: Boolean
    $repoLink: String
  ) {
    addProject(
      name: $name
      description: $description
      isPrivate: $isPrivate
      repoLink: $repoLink
    ) {
      ...Project
    }
  }

  ${ProjectFragment}
`
