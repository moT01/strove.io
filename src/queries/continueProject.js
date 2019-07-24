import gql from 'graphql-tag'
import { ProjectFragment } from './fragments/project'

export default gql`
  mutation ContinueProject($projectId: ID!) {
    continueProject(projectId: $projectId) {
      ...Project
    }
  }

  ${ProjectFragment}
`
